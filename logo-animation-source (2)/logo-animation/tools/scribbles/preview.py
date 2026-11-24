import json, numpy as np
from playwright.sync_api import sync_playwright
from PIL import Image
P = json.load(open('pieces.json'))
body = ''
for p in P:
    for l in p['layers']:
        body += '<path d="%s" fill="%s" fill-rule="evenodd"/>' % (l['d'], l['color'])
svg = '<svg xmlns="http://www.w3.org/2000/svg" width="1382" height="504" viewBox="0 0 691 252"><rect width="691" height="252" fill="#FCF8F5"/>%s</svg>' % body
with sync_playwright() as pw:
    b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 1382, 'height': 504}); pg.set_content('<body style="margin:0">' + svg + '</body>')
    pg.screenshot(path='trace_big.png'); b.close()
o = Image.open('crop.png').convert('RGB').resize((1382, 504), Image.LANCZOS)
t = Image.open('trace_big.png').convert('RGB')
sh = Image.new('RGB', (1382, 1008)); sh.paste(o, (0, 0)); sh.paste(t, (0, 504)); sh.save('compare.png')
