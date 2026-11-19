import { useStore } from "../store";
import { EditionSelector } from "../commerce";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../data";
import {
  Action,
  Back,
  BookSummary,
  ReviewCards,
  Icon,
  useUI,
} from "../components";
export function BookDetail() {
  const { id } = useParams();
  const b = getBook(id);
  const store = useStore();
  const navigate = useNavigate();
  const { modal } = useUI();
  if (!b)
    return (
      <main>
        <h1>Libro no encontrado</h1>
        <Action to="/buscar">Buscar libros</Action>
      </main>
    );
  return (
    <main className="book-detail">
      <div className="between detail-top">
        <Back />

      </div>
      <BookSummary book={b} />
        <button
          className="about-book"
          onClick={() => modal("Acerca de este libro", b.synopsis)}
        >
          Acerca de este <span aria-hidden="true">＋</span>
        </button>
      <EditionSelector
        bookId={b.id}
        value={store.selectedEdition(b.id).id}
        onChange={(edition) => store.selectEdition(b.id, edition)}
      />
      <div className="price-alert">
        <strong>
          ${store.selectedEdition(b.id).price} <small>MXN</small>
        </strong>
        <label>
          Alerta de rebajas<small>Activar o desactivar</small>
          <input
            type="checkbox"
            role="switch"
            aria-label="Alerta de rebajas"
            onChange={() =>
              modal(
                "Alerta de rebajas",
                "Esta preferencia es visual y provisional. No se enviarán notificaciones.",
              )
            }
          />
        </label>
      </div>
      <section className="panel ratings">
        <div className="between">
          <h2>Calificaciones</h2>
          <small>Basado en compradores</small>
        </div>
        <div className="rating-content">
          <div>
            <strong>4.5</strong>
            <p>★★★★☆</p>
            <small>2,310 reseñas</small>
          </div>
          <div>
            {[78, 14, 5, 2, 1].map((v, i) => (
              <div className="rating-bar" key={v}>
                <span>{5 - i}</span>
                <progress value={v} max="100" />
                <small>{v}%</small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="between section-label">
        <h2>Reseñas de la comunidad</h2>
        <Link to={`/libro/${b.id}/resenas`}>Ver todas ›</Link>
      </div>
      <ReviewCards />
      <div className="detail-actions">
        <Action to="/estante" soft>
          <Icon name="guardar-normal" /> Mi estante
        </Action>
        <button
          className="button"
          onClick={() => {
            store.add(b.id);
            navigate("/carrito");
          }}
        >
          <Icon name="bolsa-compra" /> Comprar ahora
        </button>
      </div>
    </main>
  );
}
export function Reviews() {
  const { id } = useParams();
  const b = getBook(id);
  if (!b) return null;
  return (
    <main>
      <Back />
      <h1>Reseñas de la comunidad</h1>
      <BookSummary book={b} finished />
      <ReviewCards />
      <Action to={`/libro/${b.id}/escribir`}>Escribir reseña</Action>
    </main>
  );
}
