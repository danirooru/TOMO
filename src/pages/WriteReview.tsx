import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook } from "../data";
import { Header, Back, BookSummary, Button, useUI } from "../components";
export function WriteReview() {
  const { id } = useParams();
  const b = getBook(id);
  const [stars, setStars] = useState(4);
  const [text, setText] = useState("");
  const n = useNavigate();
  const { notify } = useUI();
  if (!b) return null;
  return (
    <>
      <Header title="Escribir Reseña" titleOnly />
      <main className="write-review">
        <div className="between">
          <Back label="Cancelar" />

        </div>
        <BookSummary book={b} finished />
        <section className="star-picker">
          <h2>¿Cuántas estrellas le das?</h2>
          <div role="group" aria-label="Calificación">
            {[1, 2, 3, 4, 5].map((v) => (
              <button
                key={v}
                aria-pressed={stars === v}
                aria-label={`${v} estrellas`}
                onClick={() => setStars(v)}
              >
                {v <= stars ? "★" : "☆"}
              </button>
            ))}
          </div>
        </section>
        <label htmlFor="review" className="between section-label">
          <h2>Tu reseña</h2>
          <small>Opcional</small>
        </label>
        <div className="review-input">
          <textarea
            id="review"
            placeholder="Escribe tu opinión sobre la historia…"
            maxLength={1500}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <span>{text.length}/1500</span>
        </div>
        <label className="spoiler panel">
          <span>⚠ Contiene spoilers</span>
          <input type="checkbox" role="switch" />
        </label>
        <Button
          onClick={() => {
            notify(
              "Reseña publicada de forma provisional. No se guardó en un servidor.",
            );
            n(`/libro/${b.id}`);
          }}
        >
          ➤ Publicar reseña
        </Button>
        <button
          className="text-button private-save"
          onClick={() => {
            notify("Borrador privado de demostración.");
            n(`/libro/${b.id}`);
          }}
        >
          Guardar en privado
        </button>
      </main>
    </>
  );
}
