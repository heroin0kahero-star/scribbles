import React, {useEffect, useMemo, useState} from 'react';
import {
  AbsoluteFill,
  Easing,
  continueRender,
  delayRender,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {PIECES, Piece} from './scribblesData';

// ---- Brand ------------------------------------------------------------------
const BG = '#FCF8F5';
const PALETTE = ['#3FB6F0', '#F7543A', '#FBB020', '#A98BE0', '#9DB04A', '#E8508A'];

// ---- Layout (logo coordinates -> canvas) ------------------------------------
const W = 1600;
const H = 800;
const SCALE = 2.2;
const CX = 338.5;
const CY = 122.5;
const VB = [CX - W / SCALE / 2, CY - H / SCALE / 2, W / SCALE, H / SCALE] as const;
const BASELINE = 222;

const P: Record<string, Piece> = Object.fromEntries(PIECES.map((p) => [p.id, p]));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const clampOpt = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---- Motion helpers ----------------------------------------------------------
type Motion = {dy: number; sq: number; st: number; rot: number};

// A ball-like drop with real bounces. Squash on every impact, stretch while moving fast.
const DROP_DUR = 0.62;
const DROP_H = 300;
const IMPACTS = [1 / 2.75, 2 / 2.75, 2.5 / 2.75];
const IMPACT_SQ = [0.3, 0.16, 0.07];

const dropMotion = (sec: number, t0: number): Motion => {
  const u = clamp01((sec - t0) / DROP_DUR);
  const b = Easing.bounce;
  const dy = -DROP_H * (1 - b(u));
  const d = 0.012;
  const v = ((b(Math.min(1, u + d)) - b(Math.max(0, u - d))) / (2 * d)) * DROP_H;
  const st = u <= 0 || u >= 1 ? 0 : Math.min(1, Math.abs(v) / (DROP_H * 3.2)) * 0.14;
  let sq = 0;
  IMPACTS.forEach((c, k) => {
    sq += IMPACT_SQ[k] * Math.exp(-(((u - c) / 0.05) ** 2));
  });
  return {dy, sq, st, rot: 0};
};

// A cartoon hop: crouch, launch, hang, land.
const jumpMotion = (sec: number, t0: number, dur: number, h: number, tilt = 0): Motion => {
  const u = (sec - t0) / dur;
  if (u <= 0 || u >= 1) return {dy: 0, sq: 0, st: 0, rot: 0};
  if (u < 0.16) return {dy: 0, sq: 0.2 * Math.sin((Math.PI * u) / 0.16), st: 0, rot: 0};
  if (u < 0.84) {
    const w = (u - 0.16) / 0.68;
    return {dy: -h * 4 * w * (1 - w), sq: 0, st: 0.12 * Math.sin(Math.PI * w), rot: tilt * Math.sin(Math.PI * w)};
  }
  return {dy: 0, sq: 0.16 * Math.sin((Math.PI * (u - 0.84)) / 0.16), st: 0, rot: 0};
};

const combine = (...ms: Motion[]): Motion =>
  ms.reduce((a, m) => ({dy: a.dy + m.dy, sq: a.sq + m.sq, st: a.st + m.st, rot: a.rot + m.rot}), {dy: 0, sq: 0, st: 0, rot: 0});

const squashTransform = (cx: number, base: number, m: Motion) => {
  const sy = (1 + m.st) * (1 - 0.55 * m.sq);
  const sx = 1 / Math.sqrt(sy);
  return `translate(${cx} ${base + m.dy}) rotate(${m.rot}) scale(${sx} ${sy}) translate(${-cx} ${-base})`;
};

// ---- Timeline (seconds) ------------------------------------------------------
const ORDER = ['S', 'c', 'r', 'pencil', 'b1', 'b2', 'l', 'e', 's'];
const DROP_START = 0.12;
const DROP_STAGGER = 0.075;
const STAR_AT = 0.92;
const CLOUD_AT = 1.05;
const ARC_AT: Record<string, number> = {arcR: 1.3, arcG: 1.38, arcP: 1.46};
const ARC_DUR = 0.4;
const WAVE_AT = 1.85;
const WAVE_STAGGER = 0.055;
const WAVE_DUR = 0.42;
const RAINBOW_HOP_AT = 2.4;

// ---- Pieces ------------------------------------------------------------------
const Layers: React.FC<{p: Piece}> = ({p}) => (
  <>
    {p.layers.map((l, i) => (
      <path key={i} d={l.d} fill={l.color} fillRule="evenodd" />
    ))}
  </>
);

// Rainbow arc that grows out of the cloud along its own curve (flow-map reveal).
const Arc: React.FC<{p: Piece; sec: number; t0: number}> = ({p, sec, t0}) => {
  const prog = interpolate(sec, [t0, t0 + ARC_DUR], [0, 1], {easing: Easing.bezier(0.3, 0.9, 0.3, 1), ...clampOpt});
  if (prog <= 0) return null;
  const feather = 0.05;
  const thr = prog * (1 + feather);
  const [bx, by, bw, bh] = p.mapBox as [number, number, number, number];
  // map is 0 at the lower-left tip, 1 at the cloud; we reveal from the cloud outwards
  const slope = 1 / feather;
  const intercept = -(1 - thr) / feather;
  return (
    <g>
      <defs>
        <filter id={`f-${p.id}`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="linear" slope={slope} intercept={intercept} />
            <feFuncG type="linear" slope={slope} intercept={intercept} />
            <feFuncB type="linear" slope={slope} intercept={intercept} />
          </feComponentTransfer>
        </filter>
        <mask id={`m-${p.id}`} maskUnits="userSpaceOnUse" x={bx} y={by} width={bw} height={bh}>
          <image href={p.map} x={bx} y={by} width={bw} height={bh} preserveAspectRatio="none" filter={`url(#f-${p.id})`} />
        </mask>
      </defs>
      <g mask={prog >= 1 ? undefined : `url(#m-${p.id})`}>
        <Layers p={p} />
      </g>
    </g>
  );
};

// Small colored dots that puff out and fade (landing dust / sparkles).
const Puff: React.FC<{x: number; y: number; sec: number; t0: number; dur?: number; spread?: number; n?: number; seed: string}> = ({
  x,
  y,
  sec,
  t0,
  dur = 0.35,
  spread = 20,
  n = 4,
  seed,
}) => {
  const p = (sec - t0) / dur;
  if (p <= 0 || p >= 1) return null;
  const e = Easing.out(Easing.cubic)(p);
  return (
    <g>
      {Array.from({length: n}).map((_, k) => {
        const a = -Math.PI / 2 + (k - (n - 1) / 2) * (2.2 / Math.max(1, n - 1)) + (random(seed + k) - 0.5) * 0.4;
        const d = spread * (0.7 + random(seed + 'd' + k) * 0.6) * e;
        return (
          <circle
            key={k}
            cx={x + Math.cos(a) * d * 1.5}
            cy={y + Math.sin(a) * d}
            r={Math.max(0, 3.4 * (1 - p))}
            fill={PALETTE[(k + Math.floor(random(seed) * 6)) % 6]}
          />
        );
      })}
    </g>
  );
};

// ---- Ambient bubbles ---------------------------------------------------------
type Bub = {x: number; r: number; color: string; t0: number; speed: number; sway: number; freq: number; popY: number; tPop: number};
const makeBubbles = (): Bub[] =>
  Array.from({length: 20}).map((_, i) => {
    const speed = 190 + random(`bs${i}`) * 130;
    const t0 = (i / 20) * 0.9 + random(`bt${i}`) * 0.12;
    const popY = 10 + random(`bp${i}`) * 200;
    return {
      x: -10 + random(`bx${i}`) * 700,
      r: 7 + random(`br${i}`) * 17,
      color: PALETTE[i % PALETTE.length],
      t0,
      speed,
      sway: 5 + random(`bw${i}`) * 9,
      freq: 2 + random(`bf${i}`) * 2.5,
      popY,
      tPop: t0 + (322 - popY) / speed,
    };
  });

const Bubble: React.FC<{b: Bub; sec: number}> = ({b, sec}) => {
  if (sec < b.t0) return null;
  const POP = 0.2;
  if (sec > b.tPop + POP) return null;
  const tt = Math.min(sec, b.tPop);
  const y = 322 - b.speed * (tt - b.t0);
  const x = b.x + Math.sin((tt - b.t0) * b.freq * 2) * b.sway;
  const wob = 1 + 0.07 * Math.sin((tt - b.t0) * 9);
  if (sec <= b.tPop) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <ellipse rx={b.r * wob} ry={b.r / wob} fill={b.color} fillOpacity={0.22} stroke={b.color} strokeOpacity={0.75} strokeWidth={1.6} />
        <ellipse cx={-b.r * 0.38} cy={-b.r * 0.4} rx={b.r * 0.26} ry={b.r * 0.15} fill="#fff" fillOpacity={0.9} transform={`rotate(-35 ${-b.r * 0.38} ${-b.r * 0.4})`} />
      </g>
    );
  }
  const p = (sec - b.tPop) / POP;
  return (
    <g transform={`translate(${x} ${y})`} opacity={1 - p}>
      <circle r={b.r * (1 + 0.55 * p)} fill="none" stroke={b.color} strokeWidth={1.6 * (1 - p) + 0.3} />
      {Array.from({length: 6}).map((_, k) => {
        const a = (k / 6) * Math.PI * 2;
        const d = b.r * (1.1 + 0.9 * p);
        return <circle key={k} cx={Math.cos(a) * d} cy={Math.sin(a) * d} r={2.2 * (1 - p)} fill={b.color} />;
      })}
    </g>
  );
};

// ---- Composition ------------------------------------------------------------
export const ScribblesBounce: React.FC<{transparent?: boolean}> = ({transparent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  const [handle] = useState(() => delayRender('flow maps'));
  useEffect(() => {
    Promise.all(
      PIECES.filter((p) => p.map).map((p) => {
        const img = new Image();
        img.src = p.map as string;
        return img.decode().catch(() => undefined);
      }),
    ).then(() => continueRender(handle));
  }, [handle]);

  const bubbles = useMemo(makeBubbles, []);

  // letters + pencil: drop, bounce, then a hopping wave
  const motions: Record<string, Motion> = {};
  ORDER.forEach((id, i) => {
    const drop = dropMotion(sec, DROP_START + i * DROP_STAGGER);
    const jump = jumpMotion(sec, WAVE_AT + i * WAVE_STAGGER, WAVE_DUR, id === 'pencil' ? 40 : 28, i % 2 ? 5 : -5);
    motions[id] = combine(drop, jump);
  });

  // star: pops in with a spin, rides the pencil, twinkles at the end
  const starSpring = spring({frame: frame - STAR_AT * fps, fps, config: {damping: 7, stiffness: 150, mass: 0.7}});
  const star = P.star;
  const starC: [number, number] = [star.bbox[0] + star.bbox[2] / 2, star.bbox[1] + star.bbox[3] / 2];
  const tw = clamp01((sec - 2.3) / 0.45);
  const twinkle = Math.sin(Math.PI * tw);
  const starScale = starSpring * (1 + 0.28 * twinkle);
  const starRot = (1 - starSpring) * -230 + 18 * twinkle;
  const pencilJump = jumpMotion(sec, WAVE_AT + 3 * WAVE_STAGGER, WAVE_DUR, 40);

  // cloud: jelly pop-in
  const cloud = P.cloud;
  const cc: [number, number] = [cloud.bbox[0] + cloud.bbox[2] / 2, cloud.bbox[1] + cloud.bbox[3]];
  const cSX = spring({frame: frame - CLOUD_AT * fps, fps, config: {damping: 8, stiffness: 170, mass: 0.6}});
  const cSY = spring({frame: frame - (CLOUD_AT * fps + 3), fps, config: {damping: 8, stiffness: 170, mass: 0.6}});
  const rainbowHop = jumpMotion(sec, RAINBOW_HOP_AT, 0.38, 14);

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? 'transparent' : BG}}>
      <svg width={W} height={H} viewBox={VB.join(' ')} shapeRendering="geometricPrecision" style={{display: 'block'}}>
        {/* bubbles drift up behind everything */}
        {bubbles.map((b, i) => (
          <Bubble key={i} b={b} sec={sec} />
        ))}

        {/* rainbow + cloud hop together at the end */}
        <g transform={squashTransform(cc[0], cc[1], rainbowHop)}>
          {(['arcR', 'arcG', 'arcP'] as const).map((id) => (
            <Arc key={id} p={P[id]} sec={sec} t0={ARC_AT[id]} />
          ))}
          {(cSX > 0.001 || cSY > 0.001) && (
            <g transform={`translate(${cc[0]} ${cc[1]}) scale(${Math.max(0, cSX)} ${Math.max(0, cSY)}) translate(${-cc[0]} ${-cc[1]})`}>
              <Layers p={cloud} />
            </g>
          )}
        </g>

        {/* letters */}
        {ORDER.map((id) => {
          const p = P[id];
          const cx = id === 'pencil' ? 260 : p.bbox[0] + p.bbox[2] / 2;
          const base = id === 'pencil' ? 221.4 : BASELINE;
          return (
            <g key={id} transform={squashTransform(cx, base, motions[id])}>
              <Layers p={p} />
            </g>
          );
        })}

        {/* star */}
        {starSpring > 0.001 && (
          <g transform={`translate(0 ${pencilJump.dy})`}>
            <g transform={`translate(${starC[0]} ${starC[1]}) rotate(${starRot}) scale(${Math.max(0, starScale)}) translate(${-starC[0]} ${-starC[1]})`}>
              <Layers p={star} />
            </g>
          </g>
        )}

        {/* landing dust + sparkles */}
        {ORDER.map((id, i) => {
          const p = P[id];
          const cx = id === 'pencil' ? 260 : p.bbox[0] + p.bbox[2] / 2;
          return <Puff key={id} x={cx} y={BASELINE - 2} sec={sec} t0={DROP_START + i * DROP_STAGGER + IMPACTS[0] * DROP_DUR} seed={`d${id}`} />;
        })}
        <Puff x={starC[0]} y={starC[1]} sec={sec} t0={STAR_AT + 0.05} dur={0.45} spread={26} n={7} seed="star" />
        <Puff x={cc[0]} y={cloud.bbox[1] + 6} sec={sec} t0={CLOUD_AT + 0.05} dur={0.45} spread={24} n={6} seed="cloud" />
      </svg>
    </AbsoluteFill>
  );
};
