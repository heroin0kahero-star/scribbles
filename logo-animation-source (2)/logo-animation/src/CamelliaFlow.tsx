import React, {useEffect, useState} from 'react';
import {
  AbsoluteFill,
  Easing,
  continueRender,
  delayRender,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {SHAPES, Shape} from './shapes';

// ---- Brand ------------------------------------------------------------------
const GREEN = '#7EB959'; // sampled from the original logo
const LIGHT = '#C9E8A9'; // wet leading edge while the ink flows
const BG = '#FFFFFF';

// ---- Layout (logo coordinates -> canvas) ------------------------------------
const W = 1500;
const H = 1000;
const SCALE = 2.3;
const CX = 333.5;
const CY = 221;
const VB = [CX - W / SCALE / 2, CY - H / SCALE / 2, W / SCALE, H / SCALE] as const;

// ---- Timing (seconds) -------------------------------------------------------
type Timing = {start: number; dur: number; feather: number; band: number};

const TIMING: Record<string, Timing> = {
  arc: {start: 0.15, dur: 1.5, feather: 0.05, band: 0.07},
  mleft: {start: 0.85, dur: 1.3, feather: 0.07, band: 0.09},
  mright: {start: 1.15, dur: 0.9, feather: 0.1, band: 0.12},
};
for (let i = 0; i < 8; i++) {
  TIMING[`t${i}`] = {start: 1.85 + i * 0.1, dur: 0.85, feather: 0.14, band: 0.18};
}

const flow = Easing.bezier(0.5, 0, 0.15, 1); // slow start, long liquid glide, soft stop

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// ---- Smooth vector warp: the "liquid" wobble, applied to path coordinates ----
// (keeps edges perfectly antialiased, unlike a raster displacement filter)
const PAIR = /(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g;
const warpPath = (d: string, A: number, sec: number) => {
  if (A < 0.02) return d;
  return d.replace(PAIR, (_m, xs, ys) => {
    const x = parseFloat(xs);
    const y = parseFloat(ys);
    const dx = A * 0.6 * (Math.sin(y * 0.02 + sec * 3.1) + 0.6 * Math.sin(y * 0.047 - sec * 2.3 + 1.7));
    const dy = A * 0.6 * (Math.sin(x * 0.018 - sec * 2.7 + 0.8) + 0.6 * Math.sin(x * 0.041 + sec * 1.9));
    return `${(x + dx).toFixed(2)},${(y + dy).toFixed(2)}`;
  });
};

// ---- One shape, poured in along its own geometry ----------------------------
const Flow: React.FC<{s: Shape; sec: number; amp: number}> = ({s, sec, amp}) => {
  const t = TIMING[s.id];
  const p = interpolate(sec, [t.start, t.start + t.dur], [0, 1], {easing: flow, ...clamp});
  if (p <= 0) return null;

  const thrA = p * (1 + t.feather + t.band); // light, leading edge
  const thrB = thrA - t.band; // solid colour trailing behind it
  const done = p >= 1;
  const [bx, by, bw, bh] = s.box;
  const d = warpPath(s.d, amp, sec);

  const defs = (key: string, thr: number) => (
    <>
      <filter id={`f-${s.id}-${key}`} x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="linear" slope={-1 / t.feather} intercept={thr / t.feather} />
          <feFuncG type="linear" slope={-1 / t.feather} intercept={thr / t.feather} />
          <feFuncB type="linear" slope={-1 / t.feather} intercept={thr / t.feather} />
        </feComponentTransfer>
      </filter>
      <mask id={`m-${s.id}-${key}`} maskUnits="userSpaceOnUse" x={bx} y={by} width={bw} height={bh}>
        <image
          href={s.map}
          x={bx}
          y={by}
          width={bw}
          height={bh}
          preserveAspectRatio="none"
          filter={`url(#f-${s.id}-${key})`}
        />
      </mask>
    </>
  );

  // letters also settle up a few units as they appear
  const dy = s.kind === 'text' ? 7 * (1 - p) : 0;

  return (
    <g transform={`translate(0 ${dy})`}>
      <defs>
        {!done && defs('a', thrA)}
        {defs('b', thrB)}
      </defs>
      {!done && <path d={d} fill={LIGHT} fillRule="evenodd" mask={`url(#m-${s.id}-a)`} />}
      <path d={d} fill={GREEN} fillRule="evenodd" mask={done ? undefined : `url(#m-${s.id}-b)`} />
    </g>
  );
};

// ---- Composition ------------------------------------------------------------
export const CamelliaFlow: React.FC<{transparent?: boolean}> = ({transparent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sec = frame / fps;

  // make sure every flow map is decoded before a frame is captured
  const [handle] = useState(() => delayRender('flow maps'));
  useEffect(() => {
    Promise.all(
      SHAPES.map((s) => {
        const img = new Image();
        img.src = s.map;
        return img.decode().catch(() => undefined);
      }),
    ).then(() => continueRender(handle));
  }, [handle]);

  // liquid wobble that swells, then settles to perfectly crisp
  const amp =
    5 *
    interpolate(sec, [0.1, 1.0, 3.3], [0, 1, 0], {
      easing: Easing.bezier(0.4, 0, 0.3, 1),
      ...clamp,
    });

  // slow push-in
  const zoom = interpolate(sec, [0, 3.0], [0.965, 1], {easing: Easing.bezier(0.2, 0.7, 0.2, 1), ...clamp});

  return (
    <AbsoluteFill style={{backgroundColor: transparent ? 'transparent' : BG}}>
      <svg
        width={W}
        height={H}
        viewBox={VB.join(' ')}
        shapeRendering="geometricPrecision"
        style={{display: 'block'}}
      >

        <g transform={`translate(${CX} ${CY}) scale(${zoom}) translate(${-CX} ${-CY})`}>
          {SHAPES.map((s) => (
            <Flow key={s.id} s={s} sec={sec} amp={amp} />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};
