# TOMO — mapa previo a la implementación

## Rutas
- `/` Splash → `/sesion` → `/preferencias` → `/inicio`.
- `/registro` formulario de demostración → `/preferencias`.
- Barra inferior fija: `/inicio`, `/buscar`, `/estante`, `/comunidad`, `/perfil`.
- `/libro/:id`: ficha con portada y datos del libro seleccionado.
- `/recomendaciones`: catálogo ampliado → `/libro/:id`.
- `/libro/:id/resenas`: listado provisional → `/libro/:id/escribir`.
- `/estante/:id`: descripción desde estante → reseña o checkout.
- `/comunidad/:id`: detalle de club; `/crear-club`: formulario provisional.
- `/recompensas`, `/pedidos`: historiales de demostración.
- `/checkout/:id` → `/rechazado/:id` o `/seguimiento/:id`.

## Componentes
AppShell (ancho móvil y espacio reservado inferior), Header, BottomNav, Back,
Icon (SVG originales), Button/Link, Chips, BookCover, BookSummary, BookRow,
ShelfBook (un único punto de selección para añadir el doble toque después),
ShelfRow (repisas originales), GoalCard, ReviewCards, ClubCard, Modal,
Toast, PaymentSummary y Timeline.

## Páginas independientes
Access, Home, Search, BookDetail, Shelf, ShelfDetail, WriteReview,
Community, Profile y Purchase; las vistas secundarias se agrupan con su sección.

## Datos y límites
Catálogo local tipado: identificador, título, autor, portada original, género,
calificación, precio, sinopsis y estado. Los textos no incluidos en referencias
se completan con contenido breve de demostración. Los datos de perfil e inicio
conservan los nombres diferentes presentes en los diseños.
No hay autenticación, pagos, persistencia remota ni funcionalidades de etapa 2.
La simulación permite elegir pago rechazado o aprobado antes de continuar.

## Referencias
14 imágenes originales revisadas, sistema visual y vista general. Las capturas
son referencia de construcción, nunca fondos de interfaz. Outfit no viene en el ZIP.


## Ampliación de etapa 2
- `/carrito`: nueva pantalla Mi carrito → `/checkout` (carrito completo).
- `/checkout/:id` se conserva como compatibilidad con enlaces de la etapa 1.
- Ficha y descripción del estante añaden al estado global y abren Mi carrito.
- Inicio y Buscar añaden al mismo carrito y muestran el contador en Header.
- StoreProvider coordina preferencias, ediciones por libro, carrito y lectura.
- model.ts mantiene las reglas comprobables sin depender de componentes.
- ShelfBook conserva su sitio en la repisa; el cursor o foco muestra la vista previa y un clic/toque abre la descripción.
