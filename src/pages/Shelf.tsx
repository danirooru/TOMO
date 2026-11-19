import { useStore } from "../store";
import { cover } from "../data";
import { AnimatedProgress, Button, Icon } from "../components";
import { Image } from "../media";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { books, getBook, type Book } from "../data";
import {
  GoalCard,
  Chips,
  BookCover,
  Action,
  Back,
  BookSummary,
} from "../components";
// El cursor o foco destaca; un clic o toque abre la descripción existente.
export function ShelfBook({
  book,
  selected,
  onSelect,
  onDeselect,
}: {
  book: Book;
  selected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}) {
  const { state } = useStore();
  const reading = state.reading[book.id];
  const n = useNavigate();
  const root = useRef<HTMLDivElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 12, top: 12, width: 120 });
  useLayoutEffect(() => {
    if (!selected) return;
    const place = () => {
      const rect = root.current!.getBoundingClientRect();
      // Iguala la etiqueta a la portada con su escala de elevación aplicada.
      const w = rect.width * 1.15;
      info.current!.style.width = `${w}px`;
      const h = info.current!.offsetHeight;
      const above = rect.top - rect.height * 0.15 - 16 - h;
      const app = root.current!.closest(".app")!.getBoundingClientRect();
      const leftEdge = Math.max(8, app.left + 8);
      const rightEdge = Math.min(window.innerWidth - 8, app.right - 8);
      const bottom =
        document.querySelector(".bottom-nav")?.getBoundingClientRect().top ||
        window.innerHeight;
      setPosition({
        width: w,
        left: Math.max(
          leftEdge,
          Math.min(rightEdge - w, rect.left + rect.width / 2 - w / 2),
        ),
        top: Math.max(
          12,
          Math.min(bottom - h - 12, above >= 12 ? above : rect.bottom + 18),
        ),
      });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [selected]);
  const percent = Math.round((reading.page / reading.pages) * 100);
  return (
    <div
      ref={root}
      className={`shelf-book ${selected ? "is-selected" : ""}`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") onSelect();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") onDeselect();
      }}
    >
      <button
        type="button"
        className="shelf-cover"
        aria-label={`${book.title}. Abrir descripción`}
        aria-expanded={selected}
        aria-describedby={selected ? `info-${book.id}` : undefined}
        onFocus={onSelect}
        onBlur={onDeselect}
        onClick={() => n(`/estante/${book.id}`)}
      >
        <Image src={cover(book)} alt={`Portada de ${book.title}`} />
      </button>
      <div
        ref={info}
        style={{
          position: "fixed",
          left: position.left,
          top: position.top,
          width: position.width,
          bottom: "auto",
          right: "auto",
          transform: "none",
        }}
        className="shelf-info"
        id={`info-${book.id}`}
        role={selected ? "status" : undefined}
        aria-hidden={!selected}
      >
        <strong>{book.title}</strong>
        <span>{book.author}</span>
        <small>
          {reading.status}
          {reading.status === "Leyendo" ? ` · ${percent}%` : ""}
        </small>
      </div>
    </div>
  );
}
export function ShelfHeader() {
  return (
    <>
      <div className="between shelf-heading">
        <h1>Mi estante</h1>
        <div>
          <Link
            className="search-circle"
            to="/buscar"
            aria-label="Buscar libros"
          >
            ⌕
          </Link>
          <Link className="button small" to="/buscar">
            ＋ Agregar
          </Link>
        </div>
      </div>
      <span className="pill saved-count"><Icon community name="libros" /> 24 libros guardados</span>
    </>
  );
}
export function Shelf() {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!(e.target instanceof Element) || !e.target.closest(".shelf-book"))
        setSelected(null);
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const [filter, setFilter] = useState("Todos (24)");
  const rows = [
    ["FAVORITOS", "cien", "noche", "sombra"],
    ["INSPIRACIÓN Y FICCIONES", "principito", "tokio", "corte"],
    ["CLÁSICOS Y ENSAYO", "heartless", "percy", "mujercitas"],
  ];
  return (
    <main className="shelf">
      <ShelfHeader />
      <GoalCard />
      <Chips
        items={["Todos (24)", "Leyendo (3)", "Quiero leer (12)"]}
        onChange={setFilter}
      />
      <div data-filter={filter}>
        {rows.map(([title, ...ids], i) => (
          <section className="shelf-row" key={title}>
            <div className="between">
              <h2>{title}</h2>
              <span>ESTANTE 0{i + 1}</span>
            </div>
            <div className="shelf-books">
              {ids.map((id) => (
                <ShelfBook
                  key={id}
                  book={books.find((b) => b.id === id)!}
                  selected={selected === id}
                  onSelect={() => setSelected(id)}
                  onDeselect={() =>
                    setSelected((current) => (current === id ? null : current))
                  }
                />
              ))}
            </div>
            <Image
              className="shelf-wood"
              src="/assets/imagenes/estante/estante.png"
              alt=""
            />
          </section>
        ))}
      </div>
    </main>
  );
}
export function ShelfDetail() {
  const { id } = useParams();
  const b = getBook(id);
  const store = useStore();
  const navigate = useNavigate();
  if (!b) return null;
  const reading = store.state.reading[b.id];
  const percent = Math.round((reading.page / reading.pages) * 100);
  return (
    <>
      <div className="shelf-detail-background">
        <ShelfHeader />
      </div>
      <main className="shelf-detail">
        <Back label="Regresar al estante" to="/estante" />
        <BookSummary book={b} />
        <section className="panel">
          <h2>ESTADO EN TU BIBLIOTECA</h2>
          <Chips
            items={["Leyendo", "Quiero leer", "Leído"]}
            key={`${b.id}-${reading.status}`}
            initial={reading.status}
            onChange={(s) => store.setStatus(b.id, s as typeof reading.status)}
          />
        </section>
        <section className="panel reading-progress">
          <div className="between">
            <h2>Progreso de lectura</h2>
            <b>
              Página {reading.page} de {reading.pages} ({percent}%)
            </b>
          </div>
          <AnimatedProgress value={percent} label={`${percent}% de lectura`} />
          <div className="between">
            <small>Progreso de demostración</small>
            <small>Quedan {reading.pages - reading.page} páginas</small>
          </div>
        </section>
        <h2>SINOPSIS</h2>
        <p className="synopsis">{b.synopsis}</p>
        <Button
          onClick={() => {
            store.add(b.id);
            navigate("/carrito");
          }}
        >
          Agregar al carrito (${store.selectedEdition(b.id).price} MXN)
        </Button>
        <Action to={`/libro/${b.id}/escribir`} soft>
          Escribir una reseña
        </Action>
      </main>
    </>
  );
}
