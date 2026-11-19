"""Empaqueta dist en un HTML portátil sin conexiones externas."""
from pathlib import Path
import base64
import json
import mimetypes
import re

root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
html = (dist / 'index.html').read_text()
assets = {}
for path in (dist / 'assets').rglob('*'):
    if path.is_file() and path.suffix in {'.png', '.svg', '.ttf'}:
        mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
        assets['/' + path.relative_to(dist).as_posix()] = 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()
# La versión de archivo conserva sus iconos embebidos; la instalación usa index.html por HTTP.
for asset_path, data in assets.items():
    if asset_path.startswith('/assets/app/'):
        html = html.replace(asset_path, data)
html = re.sub(r'<link rel="manifest"[^>]*>', '', html)
style_path = re.search(r'<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>', html).group(1)
css = (dist / style_path.lstrip('/')).read_text()
for path, data in assets.items():
    if path.endswith('.ttf'):
        css = css.replace(path, data)
script_path = re.search(r'<script type="module"[^>]*src="([^"]+)"[^>]*></script>', html).group(1)
js = (dist / script_path.lstrip('/')).read_text().replace('</script', '<\\/script')
html = re.sub(r'<link rel="stylesheet"[^>]*>', lambda _: '<style>' + css + '</style>', html)
html = re.sub(r'<script type="module"[^>]*></script>', '', html)
boot = '<script>window.TOMO_ASSETS=' + json.dumps(assets, ensure_ascii=True) + ';</script><script type="module">' + js + '</script>'
html = html.replace('</body>', boot + '</body>')
(root / 'TOMO.html').write_text(html)
print('TOMO.html listo:', (root / 'TOMO.html').stat().st_size, 'bytes')
