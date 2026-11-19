import { useNavigate } from "react-router-dom";
import { Image } from "./media";
import { getBook, cover } from "./data";
import { editionById, editionsFor, type CartLine } from "./model";
import { useStore } from "./store";
import { Icon, Button, Header, Action } from "./components";
export const money = (n: number) => `$${n.toFixed(2)} MXN`;
export function EditionSelector({
  bookId,
  value,
  onChange,
  compact = false,
}: {
  bookId: string;
  value: string;
  onChange: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <fieldset className={`edition-selector ${compact ? "compact" : ""}`}>
      <legend>Idioma de la edición</legend>
      <div>
        {editionsFor(bookId).map((e) => (
          <button
            type="button"
            key={e.id}
            disabled={!e.available}
            aria-pressed={value === e.id}
            className={value === e.id ? "selected" : ""}
            onClick={() => onChange(e.id)}
          >
            {e.language}
            {!e.available && <small>No disponible</small>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
export function CartItem({ line }: { line: CartLine }) {
  const store = useStore();
  const edition = editionById(line.editionId)!;
  const b = getBook(edition.bookId)!;
  return (
    <article className="checkout-book cart-item">
      <Image src={cover(b)} alt={`Portada de ${b.title}`} />
      <div>
        <h2>{b.title}</h2>
        <p>{b.author}</p>
        <small className="edition-caption">
          {edition.language} · {edition.name}
        </small>
        <EditionSelector
          compact
          bookId={b.id}
          value={edition.id}
          onChange={(id) => store.change(edition.id, id)}
        />
        <div className="between">
          <div className="quantity">
            <button
              type="button"
              aria-label={`Reducir cantidad de ${b.title} en ${edition.language}`}
              disabled={line.quantity === 1}
              onClick={() => store.quantity(edition.id, line.quantity - 1)}
            >
              −
            </button>
            <span aria-label="Cantidad">{line.quantity}</span>
            <button
              type="button"
              aria-label={`Aumentar cantidad de ${b.title} en ${edition.language}`}
              onClick={() => store.quantity(edition.id, line.quantity + 1)}
            >
              +
            </button>
          </div>
          <b>{money(edition.price)}</b>
        </div>
        <small className="line-total">
          {money(edition.price * line.quantity)} en esta edición
        </small>
      </div>
      <button
        type="button"
        className="remove"
        aria-label={`Eliminar ${b.title} en ${edition.language}`}
        onClick={() => store.remove(edition.id)}
      >
        <svg
          width="17"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7" />
        </svg>
      </button>
    </article>
  );
}
export function EmptyCart() {
  return (
    <section className="empty-cart">
      <Icon nav name="03-mi-estante" />
      <h1>Tu carrito está esperando una buena historia</h1>
      <p>Explora nuestro catálogo y encuentra tu próxima lectura</p>
      <Action to="/buscar">Explorar libros</Action>
    </section>
  );
}
export function Cart() {
  const { state } = useStore();
  const n = useNavigate();
  const total = state.cart.reduce(
    (sum, l) => sum + editionById(l.editionId)!.price * l.quantity,
    0,
  );
  return (
    <>
      <Header title="Mi carrito" back />
      <main className="cart-page">
        {state.cart.length ? (
          <>
            <p className="demo-caption">Ediciones y precios de demostración</p>
            <div aria-live="polite" className="cart-items">
              {state.cart.map((l) => (
                <CartItem key={l.editionId} line={l} />
              ))}
            </div>
            <section className="panel cart-subtotal between">
              <h2>Subtotal</h2>
              <strong>{money(total)}</strong>
            </section>
            <Button onClick={() => n("/checkout")}>Continuar al pago</Button>
          </>
        ) : (
          <EmptyCart />
        )}
      </main>
    </>
  );
}
