"""Sirve exclusivamente el prototipo compilado a dispositivos de la misma red."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import socket

root = Path(__file__).resolve().parent / 'dist'
if not (root / 'index.html').is_file():
    raise SystemExit('Falta la versión compilada en dist/.')
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
try:
    sock.connect(('8.8.8.8', 80))
    address = sock.getsockname()[0]
finally:
    sock.close()
url = f'http://{address}:4175/#/'
try:
    server = ThreadingHTTPServer(('0.0.0.0', 4175), partial(SimpleHTTPRequestHandler, directory=str(root)))
except OSError:
    raise SystemExit('El puerto 4175 está ocupado. Cierra el servidor anterior de TOMO y vuelve a abrir este lanzador.')
print(f'TOMO para celular: {url}\nConecta tu celular a la misma red Wi-Fi que esta Mac.\nMantén esta ventana abierta; Ctrl+C detiene el servidor.\nSi cambió la IP de la Mac, el QR anterior debe actualizarse.')
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nTOMO cerrado.')
finally:
    server.server_close()
