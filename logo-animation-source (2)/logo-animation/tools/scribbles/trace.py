import numpy as np, cv2, json, base64, os, io, sys, potrace
from skimage.graph import MCP_Geometric
from scipy import ndimage as ndi
from PIL import Image

K = 5
up = np.load('up.npy').astype(np.float32)
lab = np.load('lab.npy')
BG = np.array([252, 248, 245], np.float32)
BROWN = (131, 61, 4)

# group: (name, component ids, palette guesses, outputs{piece: classes}, base-silhouette?)
GROUPS = [
    ('S',  [2],  {'ink': BROWN}, {'S': ['ink']}, False),
    ('c',  [10], {'ink': (247, 84, 53)}, {'c': ['ink']}, False),
    ('r',  [11], {'ink': BROWN}, {'r': ['ink']}, False),
    ('b1', [4],  {'ink': BROWN}, {'b1': ['ink']}, False),
    ('b2', [5],  {'ink': BROWN}, {'b2': ['ink']}, False),
    ('l',  [6],  {'ink': BROWN}, {'l': ['ink']}, False),
    ('e',  [9],  {'ink': BROWN}, {'e': ['ink']}, False),
    ('s',  [8],  {'ink': BROWN}, {'s': ['ink']}, False),
    ('star', [3], {'ink': (248, 175, 20)}, {'star': ['ink']}, False),
    ('pencil', [7], {'tip': (125, 65, 15), 'cone': (232, 148, 70), 'bodyL': (252, 172, 10), 'bodyD': (240, 140, 5),
                      'blueL': (10, 185, 245), 'blueD': (5, 140, 205), 'pink': (230, 8, 90)},
     {'pencil': ['tip', 'cone', 'bodyL', 'bodyD', 'blueL', 'blueD', 'pink']}, True),
    ('rain', [1], {'red': (238, 90, 58), 'green': (165, 176, 74), 'purple': (170, 140, 224), 'blue': (30, 160, 220)},
     {'arcR': ['red'], 'arcG': ['green'], 'arcP': ['purple'], 'cloud': ['blue']}, False),
]

PENCIL = [
    {'color': '#F59206', 'cls': 'body',  'd': 'M248,154 H271 V193.5 H248 Z'},
    {'color': '#FFAE0A', 'cls': 'light1', 'd': 'M250.6,154 H256.4 V192.5 H250.6 Z'},
    {'color': '#FFAE0A', 'cls': 'light2', 'd': 'M263.6,154 H269 V192.5 H263.6 Z'},
    {'color': '#E9904A', 'cls': 'cone',  'd': 'M260,125.8 C261.2,125.8 262.2,127.2 263.5,131 L271,155 L248,155 L256.5,131 C257.8,127.2 258.8,125.8 260,125.8 Z'},
    {'color': '#8A4A12', 'cls': 'tip',   'd': 'M260,125.8 C261.2,125.8 262.2,127.2 263.4,131 L264.7,136.3 Q260,138.6 255.3,136.3 L256.6,131 C257.8,127.2 258.8,125.8 260,125.8 Z'},
    {'color': '#06B5F7', 'cls': 'blue',  'd': 'M248,193 H271 V209.3 H248 Z'},
    {'color': '#0291E3', 'cls': 'blueD', 'd': 'M248,199.2 H271 V203.6 H248 Z'},
    {'color': '#ED0358', 'cls': 'pink',  'd': 'M248,209 H271 V215.6 Q271,221.4 265,221.4 H254 Q248,221.4 248,215.6 Z'},
]
KIND = {'star': 'star', 'pencil': 'pencil', 'arcR': 'arc', 'arcG': 'arc', 'arcP': 'arc', 'cloud': 'cloud'}

def to_hex(c): return '#%02X%02X%02X' % tuple(int(round(v)) for v in c)

def path_from(plist, ox, oy):
    parts = []
    f = lambda p: "%.2f,%.2f" % (p.x / K + ox, p.y / K + oy)
    for curve in plist:
        parts.append("M" + f(curve.start_point))
        for s in curve.segments:
            if s.is_corner: parts.append("L" + f(s.c) + "L" + f(s.end_point))
            else: parts.append("C" + f(s.c1) + " " + f(s.c2) + " " + f(s.end_point))
        parts.append("Z")
    return "".join(parts)

def trace_mask(m, x0, y0):
    bm = potrace.Bitmap(~m)   # polarity verified on the earlier logo
    pl = bm.trace(turdsize=30, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.5)
    return path_from(pl, x0 / K, y0 / K)

pieces = []
for gname, comps, pal, outputs, base in GROUPS:
    own = np.isin(lab, comps)
    ys, xs = np.where(own)
    pad = 14
    x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, up.shape[1])
    y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, up.shape[0])
    reg = up[y0:y1, x0:x1]
    region = cv2.dilate(own[y0:y1, x0:x1].astype(np.uint8), np.ones((15, 15), np.uint8)) > 0
    names = list(pal.keys())
    cols = np.array([pal[n] for n in names], np.float32)
    for _ in range(3):  # refine palette with a few k-means steps (bg fixed)
        allc = np.vstack([BG[None], cols])
        d = ((reg[:, :, None, :] - allc[None, None]) ** 2).sum(3)
        idx = d.argmin(2)
        for k in range(len(names)):
            sel = (idx == k + 1) & region
            if sel.sum() > 200:
                cols[k] = np.median(reg[sel], axis=0)
    allc = np.vstack([BG[None], cols])
    d = ((reg[:, :, None, :] - allc[None, None]) ** 2).sum(3)
    idx = d.argmin(2).astype(np.uint8)
    if gname == 'rain':
        # thin coloured strokes: classify by hue (anti-aliased pixels keep their stroke's hue)
        hsv = cv2.cvtColor(np.clip(reg, 0, 255).astype(np.uint8), cv2.COLOR_RGB2HSV)
        H, Sat = hsv[..., 0].astype(int), hsv[..., 1].astype(int)
        idx = np.zeros(H.shape, np.uint8)
        fgm = Sat >= 55
        rules = {'red': (H <= 14) | (H >= 168), 'green': (H >= 20) & (H <= 60),
                 'blue': (H >= 85) & (H <= 115), 'purple': (H >= 118) & (H <= 150)}
        for n, r in rules.items():
            cand = (Sat >= 40) & r & region
            thr = 0.5 * np.percentile(Sat[cand], 85) if cand.sum() > 50 else 55
            idx[(Sat >= thr) & r] = names.index(n) + 1
        for n in names:   # core colour = median of the saturated pixels
            cm = (idx == names.index(n) + 1) & region
            if cm.sum() > 50:
                core = cm & (Sat >= np.percentile(Sat[cm], 60))
                cols[names.index(n)] = np.median(reg[core], axis=0)
        # drop thin spurs where strokes meet
        for k in range(1, len(names) + 1):
            mk = cv2.morphologyEx((idx == k).astype(np.uint8), cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
            idx[(idx == k) & (mk == 0)] = 0
        if gname == 'rain':
            allrule = np.zeros(H.shape, bool)
            for r in rules.values(): allrule |= r
            mixed = (Sat >= 40) & (~allrule) & region
            blue_near = cv2.distanceTransform((idx != names.index('blue') + 1).astype(np.uint8), cv2.DIST_L2, 3) < 45
            best = np.full(H.shape, 1e9, np.float32); bk = np.zeros(H.shape, np.uint8)
            for n in ('red', 'green', 'purple'):
                k = names.index(n) + 1
                dt = cv2.distanceTransform((idx != k).astype(np.uint8), cv2.DIST_L2, 3)
                better = dt < best; best = np.where(better, dt, best); bk = np.where(better, k, bk).astype(np.uint8)
            take = mixed & blue_near & (best < 40)
            idx[take] = bk[take]
    idx[~region] = 0
    if gname != 'rain': idx = cv2.medianBlur(idx, 9)
    colmap = {n: to_hex(cols[i]) for i, n in enumerate(names)}
    sil = (idx > 0) & region
    for pid, classes in outputs.items():
        layers = []
        if base:
            # silhouette in the dominant class colour, then every class painted on top
            areas = {n: ((idx == names.index(n) + 1)).sum() for n in classes}
            dom = 'bodyD' if 'bodyD' in classes else max(areas, key=areas.get)
            sm = cv2.morphologyEx(sil.astype(np.uint8), cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8)) > 0
            sm = cv2.erode(sm.astype(np.uint8), np.ones((7, 7), np.uint8)) > 0   # keep base inside the overlays' edges
            layers.append({'color': colmap[dom], 'd': trace_mask(sm, x0, y0), 'cls': 'base'})
        for n in classes:
            m = (idx == names.index(n) + 1)
            if base:
                m = cv2.morphologyEx(m.astype(np.uint8), cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))) > 0
                m &= cv2.erode(sil.astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
            if m.sum() < 60: continue
            layers.append({'color': colmap[n], 'd': trace_mask(m, x0, y0), 'cls': n})
        # piece bounding box (original px) from the union of its classes
        um = np.zeros_like(sil)
        for n in classes: um |= (idx == names.index(n) + 1)
        yy, xx = np.where(um)
        bb = [(xx.min() + x0) / K, (yy.min() + y0) / K, (xx.max() - xx.min() + 1) / K, (yy.max() - yy.min() + 1) / K]
        piece = {'id': pid, 'kind': KIND.get(pid, 'letter'), 'layers': layers, 'bbox': bb}
        if KIND.get(pid) == 'arc':
            # geodesic flow map from the lower-left end of the arc
            mm = um.astype(np.uint8)
            cost = np.where(mm > 0, 1.0, np.inf)
            yyy, xxx = np.where(mm > 0)
            i = np.argmin(xxx * 1.0 - yyy * 0.2)
            dist, _ = MCP_Geometric(cost).find_costs([(int(yyy[i]), int(xxx[i]))])
            dist = np.where(np.isfinite(dist), dist, np.nan)
            t = dist / np.nanmax(dist)
            inv = ~np.isfinite(t)
            ind = ndi.distance_transform_edt(inv, return_distances=False, return_indices=True)
            t = np.nan_to_num(np.where(inv, t[tuple(ind)], t), nan=1.0)
            img = (np.clip(t, 0, 1) * 255).round().astype(np.uint8)
            img = cv2.resize(img, (img.shape[1] // 2, img.shape[0] // 2), interpolation=cv2.INTER_AREA)
            buf = io.BytesIO(); Image.fromarray(img).save(buf, 'PNG')
            piece['map'] = 'data:image/png;base64,' + base64.b64encode(buf.getvalue()).decode()
            piece['mapBox'] = [x0 / K, y0 / K, (x1 - x0) / K, (y1 - y0) / K]
        if pid == 'pencil':
            piece['layers'] = PENCIL
        if pid == 'arcR':   # close the small gap where the red arc meets the cloud
            piece['layers'][0]['d'] += 'M265.2,47.3L269.6,50.1L271.6,47.1L267.2,44.3Z'
        pieces.append(piece)
        print(pid, [(l['cls'], l['color'], len(l['d'])) for l in layers], 'bbox', [round(v) for v in bb], flush=True)

json.dump(pieces, open('pieces.json', 'w'))
