"""Prepara la entrega portátil para GitHub Pages sin cambiar el prototipo."""
from pathlib import Path
import json
import shutil
root = Path(__file__).resolve().parents[1]
site = root / "_site"
site.mkdir(exist_ok=True)
html = (root / "TOMO.html").read_text()
html = html.replace("</head>", '<link rel="manifest" href="./manifest.webmanifest"></head>')
(site / "index.html").write_text(html)
manifest = json.loads((root / "public/manifest.webmanifest").read_text())
manifest.update(id="./", start_url="./#/", scope="./")
for icon in manifest["icons"]:
    icon["src"] = "./" + icon["src"].lstrip("/")
(site / "manifest.webmanifest").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
shutil.copytree(root / "public/assets/app", site / "assets/app", dirs_exist_ok=True)
(site / ".nojekyll").touch()
print("GitHub Pages: entrega preparada en _site")
