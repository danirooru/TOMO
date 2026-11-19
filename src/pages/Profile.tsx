import { useStore } from "../store";
import { goalStats, currentYear, editionById } from "../model";
import { Image } from "../media";
import { Link } from "react-router-dom";
import { Header, Icon, Action, Back, Button, useUI } from "../components";
import { books, getBook } from "../data";
export function Profile() {
  const { state } = useStore();
  const { read } = goalStats(state);
  const { modal } = useUI();
  return (
    <>
      <Header hideAvatar />
      <main className="profile">
        <section className="profile-person">
          <Image
            src="/assets/imagenes/usuario/02-usuario.png"
            alt="Camila Morales"
          />
          <h1>Camila Morales</h1>
          <p className="profile-reading-count">
            <Icon name="legallibros" /> <span>{read} libros leídos en {currentYear()}</span>
          </p>
          <div>
            <span className="pill profile-streak"><Icon name="legalracha" /> Racha 12 días</span>
            <span className="pill pale">Lectora Frecuente</span>
          </div>
        </section>
        <Link className="profile-goal-link" to="/preferencias">
          Meta anual: {state.goal} libros · Editar
        </Link>
        <section className="points">
          <div className="between">
            <span>MIS PUNTOS</span>
            <span className="pill">Nivel 2 · Alondra</span>
          </div>
          <strong>240</strong>
          <progress value="240" max="400" aria-label="240 de 400 puntos" />
          <div className="between">
            <span>Te faltan 160 pts para el siguiente beneficio</span>
            <span>400 pts</span>
          </div>
        </section>
        <div className="between section-label">
          <h2>Beneficios para tu próxima compra</h2>
          <small>1 disponible</small>
        </div>
        <button
          className="reward"
          onClick={() =>
            modal(
              "Envío gratis",
              "Beneficio de demostración: envío gratis en tu siguiente pedido.",
            )
          }
        >
          <span className="round-icon">
            <Icon name="transporte" />
          </span>
          <span>
            <b>Envío gratis</b>
            <small>En tu siguiente pedido</small>
          </span>
          <b className="pill dark">Usar</b>
        </button>
        <button
          className="reward"
          onClick={() =>
            modal(
              "10% de descuento",
              "En cualquier libro. Se desbloquea al alcanzar 400 puntos en una próxima etapa.",
            )
          }
        >
          <span className="round-icon">%</span>
          <span>
            <b>10% de descuento</b>
            <small>En cualquier libro</small>
          </span>
          <span className="pill pale profile-locked-points"><Icon name="legalcandado" /> 400 pts</span>
        </button>
        <h2 className="section-label">¿Cómo sumo puntos?</h2>
        <div className="earn-points">
          {[
            ["01-escribir-resena", "Reseñar", "Publica tu opinión", "+50 pts"],
            ["02-comprar", "Comprar", "En cada pedido", "+10 pts / $100"],
            ["03-invitar", "Invitar", "A un amigo lector", "+100 pts"],
          ].map(([icon, title, txt, pts]) => (
            <button
              key={title}
              onClick={() =>
                modal(
                  title,
                  `${txt}. ${pts}. Los puntos no se acumulan en este prototipo.`,
                )
              }
            >
              <span className="round-icon">
                <Icon name={icon} />
              </span>
              <h3>{title}</h3>
              <p>{txt}</p>
              <span className="pill">{pts}</span>
            </button>
          ))}
        </div>
        <Link className="history-link panel" to="/recompensas">
          <Icon name="repetir" />
          <div>
            <b>Historial de recompensas</b>
            <small>Última actividad: hace 2 días</small>
          </div>
          <span>›</span>
        </Link>
        <Link className="history-link panel orders-link" to="/pedidos">
          <Icon name="caja" />
          <b>Mis pedidos</b>
          <span>›</span>
        </Link>
      </main>
    </>
  );
}
export function Rewards() {
  const { modal } = useUI();
  return (
    <>
      <Header hideAvatar />
      <main>
        <Back to="/perfil" />
        <h1>Historial de recompensas</h1>
        <p>Actividad de demostración</p>
        {[
          ["Reseña de un libro", "Hace 2 días", "+50 pts"],
          ["Compra de libros", "Hace 5 días", "+90 pts"],
          ["Invitaste a un amigo", "Hace 1 semana", "+100 pts"],
        ].map(([title, date, pts]) => (
          <button
            className="reward"
            key={title}
            onClick={() =>
              modal(title, `${date}: ${pts}. Actividad de ejemplo.`)
            }
          >
            <span>
              <b>{title}</b>
              <small>{date}</small>
            </span>
            <b>{pts}</b>
          </button>
        ))}
      </main>
    </>
  );
}
export function Orders() {
  const { state } = useStore();
  const orderBook =
    getBook(editionById(state.order?.lines[0]?.editionId || "")?.bookId) ||
    books[0];
  return (
    <>
      <Header hideAvatar />
      <main>
        <Back to="/perfil" />
        <h1>Mis pedidos</h1>
        <section className="panel">
          <h2>Pedido #TM-2026-8841</h2>
          <p>{orderBook.title}</p>
          <span className="pill">En camino</span>
          <p>Llega el jueves 19 de noviembre</p>
          <Action to={`/seguimiento/${orderBook.id}`}>Ver seguimiento</Action>
        </section>
        <Button soft onClick={() => window.history.back()}>
          <Icon name="regresar" /> Volver
        </Button>
      </main>
    </>
  );
}
