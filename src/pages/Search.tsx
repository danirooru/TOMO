import { useState } from "react";
import { books } from "../data";
import { Header, Chips, BookRow, Button, Icon, useUI } from "../components";
export function Search() {
  const [query, setQuery] = useState("cementerio");
  const [edited, setEdited] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const { modal } = useUI();
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const results = edited
    ? books.filter((b) =>
        normalize(
          filter === "Autor"
            ? b.author
            : filter === "Género"
              ? b.genre
              : filter === "Título"
                ? b.title
                : `${b.title} ${b.author} ${b.genre}`,
        ).includes(normalize(query)),
      )
    : ["cementerio", "klara", "almendra", "sombra"].map((id) =>
        books.find((b) => b.id === id)!,
      );
  return (
    <>
      <Header />
      <main className="search-page">
        <div className="search-bar">
          <Icon name="lupa" />
          <input
            aria-label="Buscar libros"
            placeholder="Busca título, autor o género"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setEdited(true);
            }}
          />
          <button
            aria-label="Limpiar búsqueda"
            onClick={() => {
              setQuery("");
              setEdited(true);
            }}
          >
            ×
          </button>
          <button
            aria-label="Filtros"
            onClick={() =>
              modal(
                "Filtros de búsqueda",
                "Usa las opciones Todos, Título, Autor o Género para explorar el catálogo local.",
              )
            }
          >
            ☷
          </button>
        </div>
        <Chips
          items={["Todos", "Título", "Autor", "Género", "Editorial"]}
          onChange={(s) => {
            setFilter(s);
            if (s !== "Todos") setEdited(true);
          }}
        />
        <div className="between result-count">
          <span>{results.length} resultados para ti</span>
          <button
            className="text-button"
            onClick={() =>
              modal(
                "Relevancia",
                "Resultados de demostración ordenados según el catálogo de TOMO.",
              )
            }
          >
            Relevancia ⌄
          </button>
        </div>
        <div className="book-list">
          {results.map((b) => (
            <BookRow key={b.id} book={b} shopping />
          ))}
        </div>
        <section className="request-title panel">
          <span className="round-icon">
            <Icon nav name="03-mi-estante" />
          </span>
          <h2>¿No encuentras un título?</h2>
          <p>Dinos cuál buscas y lo añadiremos al catálogo.</p>
          <Button
            onClick={() =>
              modal(
                "Solicitar título",
                "Próximamente podrás proponer un título para el catálogo. Esta acción es provisional.",
              )
            }
          >
            Solicitar título
          </Button>
        </section>
      </main>
    </>
  );
}
