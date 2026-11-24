import sys, json, time, os, numpy as np, cv2, potrace
from skimage.graph import MCP_Geometric
from scipy import ndimage as ndi
from PIL import Image

out = sys.argv[1]; pub = sys.argv[2]
os.makedirs(pub + '/maps', exist_ok=True)
K = 6
lab = np.load(out + '/labels.npy')
n = lab.max()

# component id -> (name, kind, start rule)
NAMES = {1: ('arc', 'arc'), 2: ('mleft', 'm'), 3: ('mright', 'm'),
         4: ('t0', 'text'), 5: ('t1', 'text'), 7: ('t2', 'text'), 11: ('t3', 'text'),
         8: ('t4', 'text'), 9: ('t5', 'text'), 10: ('t6', 'text'), 6: ('t7', 'text')}

def path_from(plist, ox, oy):
    parts = []
    f = lambda p: "%.2f,%.2f" % (p.x / K + ox, p.y / K + oy)
    for curve in plist:
        parts.append("M" + f(curve.start_point))
        for s in curve.segments:
            if s.is_corner:
                parts.append("L" + f(s.c) + "L" + f(s.end_point))
            else:
                parts.append("C" + f(s.c1) + " " + f(s.c2) + " " + f(s.end_point))
        parts.append("Z")
    return "".join(parts)

shapes = []
for cid, (name, kind) in NAMES.items():
    t0 = time.time()
    ys, xs = np.where(lab == cid)
    pad = 12
    x0, x1, y0, y1 = xs.min() - pad, xs.max() + pad + 1, ys.min() - pad, ys.max() + pad + 1
    m = (lab[y0:y1, x0:x1] == cid)
    bm = potrace.Bitmap(~m)
    pl = bm.trace(turdsize=20, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY,
                  alphamax=1.0, opticurve=True, opttolerance=0.5)
    d = path_from(pl, x0 / K, y0 / K)

    # geodesic flow map inside the shape
    mm = m.astype(np.uint8)
    cost = np.where(mm > 0, 1.0, np.inf)
    yy, xx = np.where(mm > 0)
    if kind == 'arc':
        sel = yy < (yy.min() + yy.max()) / 2           # upper half
        i = np.argmax(np.where(sel, xx, -1))             # right-most point of upper half = top tip
    elif kind == 'm':
        i = np.argmin(xx * 1.0 + yy * 1.0)              # top-left corner
    else:
        i = np.argmin(xx * 1.0 - yy * 0.6)              # bottom-left foot
    start = (int(yy[i]), int(xx[i]))
    mcp = MCP_Geometric(cost)
    dist, _ = mcp.find_costs([start])
    dist = np.where(np.isfinite(dist), dist, np.nan)
    mx = np.nanmax(dist)
    tmap = dist / mx
    # fill outside by nearest valid value
    inv = ~np.isfinite(tmap)
    idx = ndi.distance_transform_edt(inv, return_distances=False, return_indices=True)
    tmap = np.where(inv, tmap[tuple(idx)], tmap)
    tmap = np.nan_to_num(tmap, nan=1.0)
    # organic wobble so the flowing front is wet-looking, not a straight cut
    rng = np.random.default_rng(11)
    nz = cv2.GaussianBlur(rng.standard_normal(tmap.shape).astype(np.float32), (0, 0), 22)
    nz /= nz.std() + 1e-6
    amp = {'arc': 0.014, 'm': 0.02, 'text': 0.045}[kind]
    tmap = np.clip(tmap + amp * nz, 0, 1)
    img =(np.clip(tmap, 0, 1) * 255).round().astype(np.uint8)
    img = cv2.resize(img, (img.shape[1] // 2, img.shape[0] // 2), interpolation=cv2.INTER_AREA)  # K/2 = 3x original
    Image.fromarray(img).save('%s/maps/%s.png' % (pub, name))
    shapes.append({'id': name, 'kind': kind, 'd': d,
                   'box': [x0 / K, y0 / K, (x1 - x0) / K, (y1 - y0) / K],
                   'start': [(start[1] + x0) / K, (start[0] + y0) / K], 'len': float(mx) / K})
    print(name, 'ok %.1fs' % (time.time() - t0), 'len', round(mx / K), 'path chars', len(d), flush=True)

json.dump(shapes, open(pub + '/shapes.json', 'w'))
