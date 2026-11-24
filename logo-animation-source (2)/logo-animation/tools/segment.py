import sys, numpy as np, cv2
from PIL import Image
out = sys.argv[1]
cov = np.array(Image.open(out + '/cov.png')).astype(np.float32) / 255.0
K = 6
up = cv2.resize(cov, None, fx=K, fy=K, interpolation=cv2.INTER_CUBIC)
up = cv2.GaussianBlur(up, (0, 0), 1.2)
bm = (up > 0.5).astype(np.uint8)
n, lab, stats, cent = cv2.connectedComponentsWithStats(bm, connectivity=8)
rows = []
for i in range(1, n):
    x, y, w, h, area = stats[i]
    if area < 60: continue
    rows.append((i, x / K, y / K, w / K, h / K, area / K / K))
for r in sorted(rows, key=lambda r: (round(r[2] / 40), r[1])):
    print("comp %d  x=%.0f y=%.0f w=%.0f h=%.0f area=%.0f" % r)
np.save(out + '/labels.npy', lab); np.save(out + '/up.npy', up)
