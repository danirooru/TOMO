# TOMO · Etapas 1 y 2

Prototipo móvil realizado con React, TypeScript y Vite, React Router y CSS propio. Todas las interfaces están reconstruidas con elementos HTML; no se usan capturas como fondos.

## Abrir

Abre `TOMO.html` en un navegador para recorrer la versión portátil: incluye código, imágenes y Outfit en un solo archivo.

La carpeta `dist/` también contiene la versión compilada, con imágenes y Outfit locales.
En macOS, abre `ABRIR-TOMO.command` con Terminal. Abre el navegador automáticamente y no requiere instalar dependencias ni conectarse a internet. Mantén la Terminal abierta durante el recorrido; Ctrl+C la cierra.

También puedes ejecutar desde esta carpeta:

```sh
python3 iniciar.py
```

El sitio tiene un ancho máximo de 430 px; en un navegador de escritorio aparece centrado. En un celular ocupa el ancho disponible. Para comprobar el tamaño de pantalla en escritorio, usa el modo móvil del navegador (390 × 844 recomendado).

## Desarrollar

```sh
npm ci
npm run dev
```

Para compilar: `npm run build`. Para regenerar el HTML portátil después de compilar: `python3 scripts/portable.py`. Las rutas usan hash (`/#/inicio`), de modo que funcionan en servidores estáticos sin configuración de redirecciones.

## Recorrido

1. Toca TOMO en Splash → Iniciar sesión → Crear mi estante.
2. Navega por Inicio, Buscar, Mi estante, Comunidad y Perfil.
3. Selecciona distintas portadas para ver sus fichas correspondientes.
4. En Mi estante, pasa el cursor sobre una portada para destacarla y ver título, autor y estado en una etiqueta compacta. Un clic (o un toque en celular) abre la descripción. Retirar el cursor cierra la etiqueta. En la descripción, cambia el estado de lectura; «Leído» actualiza la meta anual y Perfil.
5. Elige una edición en la ficha y pulsa Comprar ahora para añadirla a Mi carrito. También puedes agregar libros desde Inicio, Buscar o la descripción del estante. El carrito del encabezado de Inicio y Buscar siempre abre Mi carrito. Ajusta idiomas y cantidades y pulsa Continuar al pago para abrir Checkout.
6. En Checkout, el selector «Resultado de la simulación» permite recorrer pago rechazado o aprobado. En rechazo, Reintentar conduce a Seguimiento.
7. En Perfil puedes abrir recompensas e historial de pedidos.

Todos los formularios y confirmaciones son de demostración. No hay compras, cuentas, membresías, reseñas persistentes ni servicios remotos. Los filtros del estante conservan su estado visual. Las nuevas funciones de carrito, ediciones, estados de lectura y meta son locales y persistentes.

## Estructura

- `MAPA.md`: mapa de rutas y componentes preparado antes de programar.
- `src/pages/`: pantallas agrupadas por sección.
- `src/components.tsx`: navegación, tarjetas, modal accesible y avisos.
- `src/data.ts`: catálogo tipado con 17 libros, identificadores únicos y metadatos locales.
- `src/model.ts`: ediciones simuladas, reglas de carrito, estados y cómputo anual.
- `src/store.tsx`: estado compartido con almacenamiento y restauración en localStorage (`tomo-state-v2`).
- `src/commerce.tsx`: Mi carrito, líneas compartidas con Checkout y selector de edición.
- `src/styles.css`: tokens oficiales, distribución móvil y transiciones con movimiento reducido.
- `public/assets/`: recursos originales; Outfit y su licencia; dos cubiertas textuales provisionales.

## Fidelidad y recursos faltantes

Se conservan las portadas y fotografías disponibles en el ZIP, los colores oficiales y las composiciones de las 14 referencias. Algunos assets originales difieren de las imágenes visibles en las capturas (por ejemplo, la fotografía del perfil y la tercera recomendación de Inicio); se priorizan los archivos originales suministrados.

No se incluyeron archivos separados de las portadas de «La casa en el mar más azul» ni «El nombre del viento». Esos dos títulos usan cubiertas textuales identificadas como provisionales, sin sustituirlas por la portada de otro libro. Outfit no venía en el ZIP y se incorporó desde el repositorio oficial Google Fonts, con licencia OFL. Los metadatos que no estaban en los archivos se completaron como datos de demostración.

Los SVG originales de navegación contienen el nombre de cada sección como trazados. `barra-navegacion/sin-texto/` conserva el trazado del icono para combinarlo con etiquetas HTML accesibles.

## Verificación

Consulta `VERIFICACION.md`. Las funcionalidades adicionales quedan pendientes de revisión.

## Funciones locales de esta entrega

- Libros del estante: escala 1.15, desplazamiento y recuadro con transiciones de 300 ms. El recuadro, del mismo ancho que la portada elevada, se limita al área visible del prototipo y se reposiciona al desplazar o cambiar el tamaño. La descripción conserva el encabezado con Buscar, Agregar y el contador de libros guardados. Teclado: el foco muestra la vista previa; Enter abre y Escape cierra la vista previa.
- Meta: inicia con 4 libros terminados de 12, cuenta identificadores únicos del año actual y se sincroniza entre Preferencias, Mi estante y Perfil. Marca «Cien años de soledad» como Leído para comprobar 5/12 y 42%. Los datos de páginas/progreso son de demostración.
- Ediciones: Español siempre disponible en la demo; Inglés disponible en algunos títulos. El precio en español parte del catálogo anterior; Inglés añade $35 MXN ficticios. Toda disponibilidad y precio de edición se identifica como simulado; no representa una librería real. «La sombra del viento» permite probar Inglés no disponible.
- Carrito: agrupa por identificador de edición. Repetir la misma edición suma unidades; distintos idiomas generan líneas separadas. Cambiar a una edición que ya está en el carrito fusiona cantidades sin duplicarlas. Se pueden eliminar líneas; el mínimo de cantidad es 1.
- Checkout: utiliza las mismas líneas, cantidades e idiomas. Mantiene el descuento de demostración del 10% y el envío gratis de la versión previa. El pago sigue siendo una simulación; el resultado conserva una instantánea de las líneas y el total del intento.
- Animaciones implementadas con CSS, sin dependencias adicionales, respetando `prefers-reduced-motion`.

Para conservar los datos de forma fiable usa `ABRIR-TOMO.command` / `python3 iniciar.py`: el lanzador ahora utiliza siempre `http://127.0.0.1:4175/`. Si ese puerto está ocupado, cierra la sesión anterior de TOMO antes de abrir otra. Cada navegador y origen tiene su propio localStorage. Algunos navegadores restringen su uso desde archivos `file://`; si ocurre, TOMO avisa y conserva los cambios solo durante la sesión. El HTML portátil sigue disponible.

Pruebas del modelo: `npm test`. No hay backend, procesamiento de pagos, autenticación externa ni envío de notificaciones.
