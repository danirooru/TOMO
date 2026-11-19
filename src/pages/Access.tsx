import { useStore } from "../store";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Action, Button, Icon, useUI } from "../components";
export function Splash() {
  return (
    <main className="splash">
      <Link to="/sesion" aria-label="Bienvenido a TOMO. Toca para continuar">
        <h1>TOMO</h1>
        <p>Bienvenido</p>
      </Link>
    </main>
  );
}
export function Session({ register = false }: { register?: boolean }) {
  const [show, setShow] = useState(false);
  const n = useNavigate();
  const { modal } = useUI();
  return (
    <main className="access">
      <div className="access-brand">
        <span className="logo">TOMO</span>
        <i />
        <h1>{register ? "Crea tu cuenta" : "Bienvenido de nuevo"}</h1>
        <p>Tu próxima historia te está esperando</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          n("/preferencias");
        }}
      >
        {register && (
          <label>
            Nombre
            <input autoComplete="name" placeholder="Tu nombre" required />
          </label>
        )}
        <label>
          Correo electrónico
          <div className="input-icon">
            <span aria-hidden="true">✉</span>
            <input
              type="email"
              autoComplete="email"
              defaultValue="ejemplo@tomolectores.com"
              required
              aria-label="Correo electrónico"
            />
          </div>
        </label>
        <div className="between">
          <label htmlFor="password">Contraseña</label>
          {!register && (
            <button
              className="text-button"
              type="button"
              onClick={() =>
                modal(
                  "Recuperar contraseña",
                  "En esta demostración puedes entrar con el correo y la contraseña de ejemplo.",
                )
              }
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}
        </div>
        <div className="input-icon">
          <Icon name="candado" />
          <input
            id="password"
            type={show ? "text" : "password"}
            autoComplete={register ? "new-password" : "current-password"}
            defaultValue="tomoleer"
            required
          />
          <button
            type="button"
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setShow(!show)}
          >
            {show ? "◉" : "◎"}
          </button>
        </div>
        <Button type="submit">
          {register ? "Registrarme" : "Iniciar sesión"} →
        </Button>
      </form>
      {!register && (
        <>
          <div className="separator">o continúa con</div>
          <Action to="/preferencias" soft>
            <b className="google">G</b> Continuar con Google
          </Action>
          <Action to="/preferencias" soft>
            <span aria-hidden="true">●</span> Continuar con Apple
          </Action>
        </>
      )}
      <p className="register-link">
        {register ? "¿Ya tienes una cuenta?" : "¿Todavía no tienes una cuenta?"}{" "}
        <Link to={register ? "/sesion" : "/registro"}>
          {register ? "Inicia sesión" : "Regístrate"}
        </Link>
      </p>
    </main>
  );
}
export function Preferences() {
  const { state, setGoal, setGenres } = useStore();
  const { goal, genres } = state;
  return (
    <main className="preferences">
      <div className="between">
        <span className="logo">TOMO</span>
        <Link to="/inicio">Omitir</Link>
      </div>
      <div className="between step">
        <span>PASO 2 DE 2</span>
        <span>Meta & Afinidad</span>
      </div>
      <progress value="2" max="2" aria-label="Paso 2 de 2" />
      <h1>Cuéntanos qué te gusta leer</h1>
      <p className="muted">Para recomendarte lecturas a tu medida.</p>
      <div className="between section-label">
        <h2>Géneros favoritos</h2>
        <small>Elige al menos 3</small>
      </div>
      <div className="genre-grid">
        {[
          "Romance",
          "Fantasía",
          "Misterio",
          "Terror",
          "Ciencia ficción",
          "Thriller",
          "Literatura clásica",
          "Ficción contemporánea",
          "Desarrollo personal",
        ].map((s) => (
          <button
            key={s}
            aria-pressed={genres.includes(s)}
            className={genres.includes(s) ? "selected" : ""}
            onClick={() =>
              setGenres(
                genres.includes(s)
                  ? genres.filter((x) => x !== s)
                  : [...genres, s],
              )
            }
          >
            {genres.includes(s) && "✓ "}
            {s}
          </button>
        ))}
      </div>
      <div className="between section-label">
        <h2>¿Cuántos libros quieres leer este año?</h2>
        <Icon nav name="03-mi-estante" />
      </div>
      <section className="goal-picker panel">
        <div className="between">
          <button
            aria-label="Reducir meta"
            onClick={() => setGoal(Math.max(1, goal - 1))}
          >
            −
          </button>
          <div>
            <strong>{goal}</strong>
            <p>LIBROS AL AÑO</p>
          </div>
          <button aria-label="Aumentar meta" onClick={() => setGoal(goal + 1)}>
            +
          </button>
        </div>
        <p className="goal-note">♧ 1 libro al mes para mantener el hábito.</p>
      </section>
      <Action to="/inicio">Crear mi estante →</Action>
      <Link className="skip" to="/inicio">
        Omitir por ahora
      </Link>
    </main>
  );
}
