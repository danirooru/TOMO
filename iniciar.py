"""Vista local de la versión compilada. No necesita npm ni conexión a internet."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

root = Path(__file__).resolve().parent / 'dist'
if not (root / 'index.html').is_file():
    raise SystemExit('Falta dist/index.html. Ejecuta npm install y npm run build primero.')
server = ThreadingHTTPServer(('127.0.0.1', 4175), partial(SimpleHTTPRequestHandler, directory=str(root)))
url = f'http://127.0.0.1:{server.server_port}/'
print(f'TOMO listo: {url}\nMantén esta ventana abierta. Pulsa Ctrl+C para cerrar.')
webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nTOMO cerrado.')
finally:
    server.server_close()
