import { useStore } from "./store";
import { goalStats, currentYear } from "./model";
import { Image } from "./media";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { cover, type Book } from "./data";
export const navItems = [
  ["/inicio", "Inicio", "01-inicio"],
  ["/buscar", "Buscar", "02-buscar"],
  ["/estante", "Mi estante", "03-mi-estante"],
  ["/comunidad", "Comunidad", "04-comunidad"],
  ["/perfil", "Perfil", "05-perfil"],
];
export function Icon({ name, nav = false, community = false }: { name: string; nav?: boolean; community?: boolean }) {
  return (
    <Image
      className="icon"
      src={`/assets/iconos/${nav ? "barra-navegacion/sin-texto" : community ? "comunidad" : "iconos-generales"}/${name}.svg`}
      alt=""
    />
  );
}
export function Button({
  children,
  onClick,
  soft = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  soft?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      className={`button ${soft ? "soft" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export function Action({
  to,
  children,
  soft = false,
}: {
  to: string;
  children: ReactNode;
  soft?: boolean;
}) {
  return (
    <Link className={`button ${soft ? "soft" : ""}`} to={to}>
      {children}
    </Link>
  );
}
export function Header({
  title,
  back = false,
  userIcon = false,
  hideAvatar = false,
  titleOnly = false,
}: {
  title?: string;
  back?: boolean;
  userIcon?: boolean;
  hideAvatar?: boolean;
  titleOnly?: boolean;
}) {
  const { state } = useStore();
  const { pathname } = useLocation();
  const units = state.cart.reduce((n, l) => n + l.quantity, 0);
  return (
    <header className="header">
      {titleOnly ? null : back ? (
        <Back label="" />
      ) : (
        <Link className="logo" to="/inicio">
          TOMO
        </Link>
      )}
      {title && <strong>{title}</strong>}
      {(pathname === "/inicio" || pathname === "/buscar") && (
        <Link
          className="header-cart"
          to="/carrito"
          aria-label={`Mi carrito, ${units} ${units === 1 ? "unidad" : "unidades"}`}
        >
          <Icon name="agregar-carrito" />
          {units > 0 && <span className="cart-badge">{units}</span>}
        </Link>
      )}
      {!hideAvatar && (
        <Link
          to="/perfil"
          aria-label="Ir a Perfil"
          className={`avatar-link ${userIcon ? "user-icon" : ""}`}
        >
          {userIcon ? (
            <Icon name="perfil" />
          ) : (
            <Image src="/assets/imagenes/usuario/02-usuario.png" alt="" />
          )}
        </Link>
      )}
    </header>
  );
}
export function Back({ label = "Atrás", to }: { label?: string; to?: string }) {
  const n = useNavigate();
  return (
    <button
      className="text-button back"
      aria-label={label || "Atrás"}
      onClick={() =>
        to ? n(to) : window.history.state?.idx > 0 ? n(-1) : n("/inicio")
      }
    >
      <Icon name="regresar" />{label}
    </button>
  );
}
export function BottomNav() {
  const { pathname } = useLocation();
  let active = pathname.startsWith("/estante")
    ? "/estante"
    : pathname.startsWith("/comunidad") || pathname === "/crear-club"
      ? "/comunidad"
      : pathname === "/recompensas" || pathname === "/pedidos"
        ? "/perfil"
        : pathname.startsWith("/libro") ||
            pathname.startsWith("/recomendaciones")
          ? "/inicio"
          : null;
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {navItems.map(([to, label, icon]) => (
        <NavLink
          key={to}
          to={to}
          aria-current={active === to ? "page" : undefined}
          className={({ isActive }) =>
            isActive || active === to ? "active" : ""
          }
        >
          <Icon nav name={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
export function Chips({
  items,
  initial,
  onChange,
}: {
  items: string[];
  initial?: string;
  onChange?: (s: string) => void;
}) {
  const [value, set] = useState(initial || items[0]);
  return (
    <div className="chips">
      {items.map((s) => (
        <button
          key={s}
          aria-pressed={value === s}
          className={s === value ? "selected" : ""}
          onClick={() => {
            set(s);
            onChange?.(s);
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
export function BookCover({
  book,
  to,
  className = "",
}: {
  book: Book;
  to?: string;
  className?: string;
}) {
  return (
    <Link
      to={to || `/libro/${book.id}`}
      className={`cover-link ${className}`}
      aria-label={`Ver ${book.title}`}
    >
      <Image src={cover(book)} alt={`Portada de ${book.title}`} />
    </Link>
  );
}
export function BookSummary({
  book,
  finished = false,
}: {
  book: Book;
  finished?: boolean;
}) {
  return (
    <article className="book-summary panel">
      <BookCover book={book} />
      <div>
        {finished && <span className="pill dark">✓ Terminado</span>}
        <h2>{book.title}</h2>
        <p className="author">{book.author}</p>
        {!finished && (
          <>
            <p>
              ★ <b>{book.rating}</b> <small>({book.reviews})</small>
            </p>
            <div className="tags">
              <span>{book.genre}</span>
              <span>Fantasía</span>
              <span>Confort</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
export function BookRow({
  book,
  rank,
  shopping = false,
}: {
  book: Book;
  rank?: number;
  shopping?: boolean;
}) {
  const { notify } = useUI();
  const store = useStore();
  return (
    <article className={`book-row ${shopping ? "shopping" : ""}`}>
      {rank && <b className="rank">{rank}</b>}
      <BookCover book={book} />
      <div className="row-copy">
        <Link to={`/libro/${book.id}`}>
          <h3>{book.title}</h3>
        </Link>
        <p>{book.author}</p>
        <small>
          ★ {book.rating}{" "}
          <span>
            {" "}
            · {rank ? `${book.reviews} reseñas` : `(${book.reviews})`}
          </span>
        </small>
        {shopping && (
          <p className="price">
            ${store.selectedEdition(book.id).price}
            <small> MXN</small>
          </p>
        )}
      </div>
      <div className="row-actions">
        <button
          aria-label={`Guardar ${book.title}`}
          onClick={() =>
            notify(`«${book.title}» guardado en tu estante (demostración).`)
          }
        >
          <Icon name="guardar" />
        </button>
        <button
          className="add-to-cart"
          aria-label={`Agregar ${book.title} al carrito`}
          onClick={() => {
            store.add(book.id);
            notify(
              `${book.title} · ${store.selectedEdition(book.id).language} añadido al carrito`,
            );
          }}
        >
          <Icon name="agregar-carrito" />
        </button>
      </div>
    </article>
  );
}
export function AnimatedProgress({
  value,
  max = 100,
  label,
}: {
  value: number;
  max?: number;
  label: string;
}) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return (
    <div
      className="animated-progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(max, value)}
    >
      <span
        style={{ width: `${Math.min(100, Math.max(0, (shown / max) * 100))}%` }}
      />
    </div>
  );
}
export function GoalCard() {
  const { state } = useStore();
  const { read, percent, remaining } = goalStats(state);
  return (
    <section className="goal">
      <div className="between">
        <span className="goal-label"><Icon community name="guardar" /> META {currentYear()}</span>
        <span className="pill">{percent}% completado</span>
      </div>
      <div className="between" aria-live="polite">
        <h2>
          {read} de {state.goal} libros
        </h2>
        <span>{remaining} por leer</span>
      </div>
      <AnimatedProgress
        value={read}
        max={state.goal}
        label={`${read} de ${state.goal} libros`}
      />
      <p><Icon community name="racha" /> Vas muy bien, ¡sigue a tu ritmo!</p>
    </section>
  );
}
export function ReviewCards() {
  return (
    <div className="review-cards">
      {[
        [
          "Sofía Mendoza",
          "Hace 3 días · Lectora verificada",
          "Una lectura entrañable que te abraza el corazón desde el primer capítulo.",
          "01",
        ],
        [
          "Mateo Silva",
          "Hace 1 semana",
          "Personajes muy bien construidos y un mensaje hermoso sobre pertenecer.",
          "02",
        ],
      ].map(([name, date, txt, img]) => (
        <article className="panel review-card" key={name}>
          <div className="review-head">
            <Image src="/assets/imagenes/usuario/02-usuario.png" alt="" />
            <div>
              <h3>{name}</h3>
              <small>{date}</small>
            </div>
            <span aria-label="5 estrellas">★★★★★</span>
          </div>
          <p>{txt}</p>
        </article>
      ))}
    </div>
  );
}
type UI = {
  notify: (s: string) => void;
  modal: (title: string, body: string) => void;
};
const Context = createContext<UI>({ notify: () => {}, modal: () => {} });
export const useUI = () => useContext(Context);
export function UIProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState("");
  const [dialog, setDialog] = useState<{ title: string; body: string } | null>(
    null,
  );
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(""), 3800);
      return () => clearTimeout(t);
    }
  }, [toast]);
  useEffect(() => {
    if (dialog) ref.current?.showModal();
    else ref.current?.close();
  }, [dialog]);
  return (
    <Context.Provider
      value={{
        notify: setToast,
        modal: (title, body) => setDialog({ title, body }),
      }}
    >
      {children}
      <div className="toast" role="status">
        {toast}
      </div>
      <dialog
        ref={ref}
        onCancel={() => setDialog(null)}
        onClick={(e) => {
          if (e.target === ref.current) setDialog(null);
        }}
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">{dialog?.title}</h2>
        <p>{dialog?.body}</p>
        <Button onClick={() => setDialog(null)}>Entendido</Button>
      </dialog>
    </Context.Provider>
  );
}
