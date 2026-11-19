# Verificación — etapa 1

Fecha: 17 de noviembre de 2026.

- TypeScript y compilación Vite: correctos (`npm run build`).
- 24 rutas comprobadas en navegador: acceso, 14 pantallas y vistas secundarias.
- Pruebas a 390 × 844 px: sin desbordamiento horizontal.
- Comprobación adicional a 320 × 740 px: Inicio, Estante, Comunidad, Perfil, Checkout y Seguimiento sin desbordamiento horizontal del documento.
- Recorrido Splash → sesión → preferencias → Inicio: correcto.
- Registro de demostración → preferencias: correcto.
- Cinco opciones de navegación inferior, con sección activa: correctas.
- Barra fija y espacio inferior: comprobados. En Inicio, con scroll de 250.5 px, el último libro termina a 717.9 px y la barra comienza a 756 px.
- Selección de diferentes libros: La sombra del viento abre su ficha; Klara y el sol llega a su checkout con título, portada y precio propios.
- Guardar libro: muestra aviso provisional.
- Estante → descripción de Cien años de soledad → escribir reseña → publicar → ficha del mismo libro: correcto.
- Comunidad → detalle → unirse: confirmación provisional correcta.
- Crear club de demostración → Comunidad: correcto.
- Checkout → pago rechazado → modal de método → reintentar → seguimiento: correcto.
- Checkout → resultado aprobado → seguimiento: correcto.
- Copiar guía: aviso «Guía copiada: 8492049182» comprobado.
- Sin errores de consola en las rutas revisadas.
- Outfit local cargada: comprobada con FontFaceSet.
- HTML portátil: recorrido de acceso y pantallas principales comprobados servido por HTTP local. Imágenes embebidas verificadas en diez rutas; sin errores de consola. La herramienta de navegador no permite abrir direcciones file://, por lo que la apertura por doble clic queda para revisión del usuario. Se incluye también el lanzador local como alternativa.

## Límites de esta revisión

La comparación visual se realizó sobre las capturas de referencia y capturas del prototipo. No se ejecutó una comparación automática píxel a píxel ni pruebas en hardware iOS/Android. Las diferencias entre assets suministrados y capturas, y las dos portadas faltantes, se documentan en README.md.

No se implementó funcionalidad de etapa 2. Todos los datos y resultados son locales y de demostración.

## Ajustes de revisión

- Sustituidos los iconos de las fichas por guardar-normal.svg y bolsa-compra.svg suministrados.
- Solicitar acceso utiliza llave.svg; confirmación provisional comprobada.
- Comunidad: descripciones 14 px y completas, metadatos 12 px, botones de tarjetas 15 px.
- Inicio: 10 filas verificadas en el Top 10, conservando los tres primeros puestos.
- Mis pedidos: fondo Secondary #A34E61 con texto e icono blancos; revisión visual a 390 × 844.
- Compilación Vite y TypeScript correctas; HTML portátil y ZIP regenerados.

- Avatar actualizado al archivo 02-usuario.png adjunto en encabezados, perfil y reseñas. Buscar utiliza ahora el avatar fotográfico enlazado a Perfil. Compilación correcta.


## Etapa 2 — verificación funcional

- Compilación TypeScript/Vite y pruebas del modelo correctas.
- Modelo: sumar repetidos, separar idiomas, fusionar al cambiar a una edición existente, rechazar ediciones no disponibles, restaurar localStorage y recuperar datos inválidos.
- Meta en navegador: 4/12 → marcar Cien años como Leído dos veces → 5/12 (42%, 7 restantes). Perfil muestra 5 libros. Preferencias cambia a 13 → 5/13 (38%, 8 restantes), incluso al recargar.
- Primer toque del estante mantiene ruta y escala 1.18; seleccionar otro deja una sola selección; tocar fuera cierra. Segundo toque abre el libro correcto, con autor, portada, sinopsis y páginas específicas.
- Recuadro de la última portada a 390 px: límites horizontales 168–378 px; verticalmente dentro del área visible, por encima de la navegación. Se reposiciona al desplazar.
- Carrito vacío muestra el mensaje y el enlace a Buscar solicitados.
- Español e Inglés del mismo libro se mantienen separados. Dos unidades de Cementerio en Inglés y una en Español: subtotal $928; Checkout conserva las dos líneas y total $835.20 con cupón demo.
- Recargar conserva las líneas y cantidades. Header muestra 3 unidades. Cambiar Inglés a Español fusiona en una línea de 3 ($858), reducir a 2 actualiza a $572 y eliminar deja carrito vacío.
- La sombra del viento muestra Inglés deshabilitado; el modelo también rechaza añadir esa edición.
- Añadir desde Inicio (Klara), Buscar (Almendra) y Mi estante (Tokio) produce un único carrito. Cambiar Klara a Inglés desde Checkout actualiza subtotal de $854 a $889 y total de $768.60 a $800.10.
- Pago rechazado muestra 3 unidades y $800.10. Reintento llega a Seguimiento con los tres libros, idiomas y cantidades correctos. El pago continúa siendo una simulación.
- Revisión de cabecera: icono de carrito vino con contador a la izquierda de la foto de usuario, sin eliminarla.
- Sin errores de consola durante los recorridos revisados.

Los datos de pruebas se crearon solo en el origen HTTP temporal de revisión. La entrega inicia con el carrito vacío si no existen datos anteriores en su origen. No se realizaron pagos ni conexiones a un backend.

- HTML portátil regenerado: añadir libro, recargar, abrir Mi carrito y continuar a Checkout conserva Español, $299 de subtotal y $269.10 de total; sin errores de consola.
- Comprobadas nueve rutas a 320 × 740 px sin desbordamiento horizontal.


## Revisión de interacción por cursor

- Eliminada únicamente la leyenda «Ediciones, disponibilidad y precios simulados · Rústica» de la ficha comercial.
- Referencia MOV revisada mediante fotogramas extraídos localmente: elevación al pasar el cursor, etiqueta pequeña y panel de descripción al hacer clic.
- Hover comprobado en navegador: la ruta permanece en Mi estante, escala final 1.15 y desplazamiento -6 px. Un clic abre /estante/cien.
- Recuadro reducido de 210 a 160 px, con tipografía y padding más compactos. Límites comprobados a 320 px: izquierda 152, derecha 312, sin salir del prototipo.
- La descripción conserva título Mi estante, Buscar, Agregar y 24 libros guardados, además de portada, datos, estados, progreso, sinopsis y acciones previas.
- Teclado conserva foco y Enter; los dispositivos táctiles abren con un único toque.
- Compilación correcta; texto ausente verificado y sin errores de consola en los recorridos revisados.


## Ajustes de ancho y tipografía

- El recuadro mide el ancho de la portada multiplicado por su escala 1.15; se recalcula su altura con ese ancho antes de limitar su posición al área visible.
- Título de la descripción a 26 px y autor a 18 px (23/17 px en pantallas de hasta 360 px), con prioridad sobre la regla general de títulos de panel.
- Acción actualizada a «Escribir una reseña».
- Compilación TypeScript/Vite correcta.

- Icono regresar.svg suministrado incorporado al componente Back y a los retornos a carrito/pedidos.
- Campos de acceso sin contorno rojo al escribir; conservan un indicador inferior neutro de foco. Compilación correcta.

- Perfil: iconos originales legallibros.svg, legalracha.svg y legalcandado.svg incorporados en libros leídos, racha y beneficio de 400 pts, con alineación centrada y tamaños ajustados. Se conserva el conteo dinámico de lecturas. Compilación correcta.


## Apertura desde pantalla de inicio de iPhone

- Añadidos apple-mobile-web-app-capable=yes, título TOMO y estilo de barra de estado default.
- Manifiesto con display standalone, scope raíz y URL de inicio /#/; iconos de 192/512 px y apple-touch-icon de 180 px con la identidad existente.
- Compilación y metadatos de la salida estática verificados. La versión portátil embebe sus iconos y no depende de un manifiesto externo.
- Es necesario eliminar y volver a crear el acceso de Inicio anterior. La apertura real sin barras queda pendiente de comprobar en el iPhone del usuario; no se ha añadido uso offline ni alojamiento público.


## Ajustes visuales del 19 de noviembre de 2026
- Encabezado de reseña sin flecha duplicada, alineado a la izquierda.
- Top 10: título 16 px, autor 14 px, reseñas 13 px.
- Acerca de este movido antes del idioma y destacado como botón; modal comprobado.
- Icono de unión ampliado; personas y estado originales en los tres clubes.
- Iconos de puntos ampliados a 26 px.
- Iconos originales libros, guardar y racha en estante y meta.
- Build correcto y revisión del navegador a 390 × 844; SVG cargados correctamente.

- Segunda revisión: retirado Tu reseña superior; iconos de puntos a 39 px sin padding; textos pequeños de meta +2 px, título principal sin cambios; símbolo de unión dibujado centrado sin dependencia de línea tipográfica. Compilación y HTML portátil regenerados.

- Pago rechazado: encabezado Error sin flecha ni perfil; se conserva Volver al carrito. Clubes: etiquetas 12 px, lectura actual 11/15/12 px (etiqueta/título/autor). Build correcto.
