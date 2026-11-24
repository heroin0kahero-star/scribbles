import numpy as np, cv2
from PIL import Image
im = Image.open('/mnt/user-data/attachments/1acc623a-7677-5a3f-a64b-7bb2a30d1bba/b4507dca-image.png').convert('RGB')
im = im.crop((4, 5, 695, 257))          # drop the screenshot frame
im.save('crop.png')
a = np.array(im).astype(np.float32)
bg = np.median(a[:6].reshape(-1, 3), axis=0); print('bg', bg)
K = 5
up = cv2.resize(a, None, fx=K, fy=K, interpolation=cv2.INTER_CUBIC)
up = cv2.GaussianBlur(up, (0, 0), 1.0)
dist = np.sqrt(((up - bg) ** 2).sum(2))
fg = (dist > 45).astype(np.uint8)
n, lab, st, cen = cv2.connectedComponentsWithStats(fg, connectivity=8)
rows = []
for i in range(1, n):
    x, y, w, h, area = st[i]
    if area < 150: continue
    m = lab == i
    col = np.median(up[m], axis=0)
    rows.append((i, x / K, y / K, w / K, h / K, area / K / K, *col.round()))
for r in sorted(rows, key=lambda r: r[1]):
    print("comp %2d x=%5.0f y=%4.0f w=%4.0f h=%4.0f area=%6.0f rgb=(%d,%d,%d)" % r)
np.save('lab.npy', lab); np.save('up.npy', up.astype(np.uint8))
