import { Link } from "react-router-dom";
import { books } from "../data";
import { Header, Chips, BookCover, BookRow, Icon, Back } from "../components";
export function Home() {
  const rec = ["reina", "hamnet", "noche", "klara", "almendra"].map((id) =>
    books.find((b) => b.id === id)!,
  );
  return (
    <>
      <Header />
      <main className="home">
        <div className="greeting">
          <h1>Hola, Daniela</h1>
          <p>¿Qué vas a leer hoy?</p>
        </div>
        <Link to="/buscar" className="search-bar primary">
          <Icon name="lupa" />
          <span>Busca título, autor o género</span>
          <span>☷</span>
        </Link>
        <Chips
          items={[
            "✧ Para ti",
            "Ficción íntima",
            "Realismo mágico",
            "Club de lectura",
          ]}
        />
        <div className="between section-label">
          <h2>Sugeridos para ti</h2>
          <Link to="/recomendaciones">Ver más ›</Link>
        </div>
        <div className="recommendations">
          {rec.map((b) => (
            <article key={b.id}>
              <BookCover book={b} />
              <h3>
                <Link to={`/libro/${b.id}`}>{b.title}</Link>
              </h3>
              <p>{b.author}</p>
            </article>
          ))}
        </div>
        <div className="between section-label">
          <h2>Top 10 lecturas populares</h2>
          <span>Esta semana</span>
        </div>
        <div className="book-list">
          {[
            "sombra",
            "cien",
            "heartless",
            "cementerio",
            "klara",
            "almendra",
            "reina",
            "hamnet",
            "principito",
            "mujercitas",
          ].map((id, i) => (
            <BookRow
              key={id}
              book={books.find((b) => b.id === id)!}
              rank={i + 1}
            />
          ))}
        </div>
      </main>
    </>
  );
}
export function Recommendations() {
  return (
    <>
      <Header title="Recomendaciones" />
      <main>
        <Back />
        <h1>Sugeridos para ti</h1>
        <div className="catalog-grid">
          {books.map((b) => (
            <article key={b.id}>
              <BookCover book={b} />
              <h2>
                <Link to={`/libro/${b.id}`}>{b.title}</Link>
              </h2>
              <p>{b.author}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
