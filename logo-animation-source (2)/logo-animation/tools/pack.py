import json, base64, sys
pub = sys.argv[1]; dst = sys.argv[2]
shapes = json.load(open(pub + '/shapes.json'))
for s in shapes:
    b = open('%s/maps/%s.png' % (pub, s['id']), 'rb').read()
    s['map'] = 'data:image/png;base64,' + base64.b64encode(b).decode()
js = 'export type Shape = {id: string; kind: "arc" | "m" | "text"; d: string; box: [number, number, number, number]; start: [number, number]; len: number; map: string};\n'
js += 'export const SHAPES: Shape[] = ' + json.dumps(shapes) + ';\n'
open(dst, 'w').write(js)
print('bytes', len(js))
