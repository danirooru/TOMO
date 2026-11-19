# TOMO en tu celular

1. Conecta el celular y esta Mac a la misma red Wi-Fi.
2. Mantén el servidor de TOMO abierto en la Mac. Para iniciarlo de nuevo, abre `ABRIR-TOMO-CELULAR.command` con Terminal.
3. Escanea `QR-celular.png` con la cámara del celular.

Dirección utilizada por este QR: http://172.31.145.158:4175/#/

La Mac debe estar encendida y sin entrar en reposo. El enlace es local: no funciona desde otra red ni desde datos móviles. Algunas redes de invitados o institucionales impiden la comunicación entre dispositivos. Si cambia la IP de la Mac, se necesita actualizar el QR.

Para detener el servidor pulsa Ctrl+C en su Terminal. Este lanzador sirve solo la carpeta compilada `dist/`; el lanzador anterior sigue siendo exclusivamente para acceso desde la Mac.


## Añadir TOMO como app en iPhone

La versión servida incluye ahora metadatos de apertura standalone para Safari, nombre TOMO, icono de inicio y un manifiesto con display standalone.

1. Elimina el acceso directo de TOMO creado antes de esta actualización.
2. Abre la dirección del QR en Safari y recarga la página.
3. En Compartir, elige Agregar a Inicio. Activa Abrir como app web si aparece.
4. Pulsa Agregar y abre TOMO desde el icono nuevo de la pantalla de inicio.

Escanear el QR abre el navegador; el modo app se solicita al abrir el icono instalado. La compatibilidad exacta depende de la versión de iOS. Si vuelve a abrir Safari, anota la versión en Configuración → General → Información. La apertura standalone no añade funcionamiento sin conexión: la Mac y el servidor siguen siendo necesarios.
