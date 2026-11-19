import { Image } from "../media";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clubs, getBook, cover } from "../data";
import {
  Header,
  Chips,
  Icon,
  Button,
  Back,
  Action,
  useUI,
} from "../components";
export function ClubCard({ club }: { club: (typeof clubs)[number] }) {
  const { modal } = useUI();
  return (
    <article className="club-card">
      <Link to={`/comunidad/${club.id}`} className="club-photo">
        <Image
          src={`/assets/imagenes/comunidad/${club.image}`}
          alt={club.title}
        />
        <span className="pill club-genre">{club.genre}</span>
        <span className="pill club-privacy">{club.label}</span>
        <h2>{club.title}</h2>
      </Link>
      <div className="club-body">
        <p>{club.description}</p>
        <small className="club-meta">
          <span><Icon community name="personas" /> {club.members} integrantes</span>
          <span><Icon community name="publico" />{" "}
          {club.id === "paginas"
            ? "Club Público"
            : club.id === "medianoche"
              ? "Moderado"
              : "Muy activo hoy"}</span>
        </small>
        <Link to={`/libro/${club.book}`} className="club-reading">
          <Image src={cover(getBook(club.book)!)} alt="" />
          <div>
            <small>
              {club.id === "paginas"
                ? "LEYENDO ESTE MES"
                : "LECTURA DE TEMPORADA"}
            </small>
            <h3>{club.reading}</h3>
            <p>{club.author}</p>
          </div>
        </Link>
        {club.id === "paginas" ? (
          <Action to={`/comunidad/${club.id}`}>Ver club y lecturas</Action>
        ) : (
          <Button
            onClick={() =>
              modal(
                club.id === "medianoche"
                  ? "Solicitud enviada"
                  : "¡Te uniste al club!",
                `Confirmación provisional para ${club.title}. Podrás gestionar tus clubes en una próxima etapa.`,
              )
            }
          >
            {club.id === "medianoche" ? (
              <>
                <Icon name="llave" /> Solicitar acceso
              </>
            ) : (
              <><span className="join-symbol" aria-hidden="true">⊕</span> Unirme al club</>
            )}
          </Button>
        )}
      </div>
    </article>
  );
}
export function Community() {
  const { modal } = useUI();
  return (
    <>
      <Header title="Comunidad" />
      <main className="community">
        <h1>Las mejores historias se comparten</h1>
        <div className="search-bar">
          <Icon name="lupa" />
          <input
            aria-label="Buscar club"
            placeholder="Busca un club de lectura o autor…"
            onChange={() => {}}
          />
          <button
            aria-label="Filtros de clubes"
            onClick={() =>
              modal(
                "Clubes de lectura",
                "Explora los tres clubes de demostración de esta pantalla.",
              )
            }
          >
            ☷
          </button>
        </div>
        <Chips items={["Todos", "Romance", "Fantasía", "Misterio"]} />
        <section className="create-club panel">
          <Icon name="crear-comunidad" />
          <div>
            <h3>¿No encuentras?</h3>
            <p>Crea tu propio espacio</p>
          </div>
          <Action to="/crear-club">＋ Crear club</Action>
        </section>
        <div className="between section-label">
          <h2>
            Mis clubes <span className="pill">1</span>
          </h2>
          <button
            className="text-button"
            onClick={() =>
              modal("Mis clubes", "Entre páginas es tu club de demostración.")
            }
          >
            Gestionar ›
          </button>
        </div>
        <ClubCard club={clubs[0]} />
        <div className="between section-label">
          <h2>Descubre nuevos clubes</h2>
          <small>Explora 40+ activos</small>
        </div>
        {clubs.slice(1).map((c) => (
          <ClubCard key={c.id} club={c} />
        ))}
      </main>
    </>
  );
}
export function ClubDetail() {
  const { id } = useParams();
  const c = clubs.find((x) => x.id === id);
  const { modal } = useUI();
  if (!c)
    return (
      <main>
        <Back />
        <h1>Club no encontrado</h1>
      </main>
    );
  return (
    <>
      <Header title="Comunidad" />
      <main>
        <Back to="/comunidad" />
        <ClubCard club={c} />
        <h1>{c.title}</h1>
        <h2>Nuestra próxima lectura</h2>
        <p>
          Comparte tus impresiones y descubre nuevas historias con {c.members}{" "}
          lectores.
        </p>
        <section className="panel">
          <h2>Próxima reunión</h2>
          <p>Jueves · 19:00 h</p>
          <p>Conversaremos sobre los primeros capítulos de {c.reading}.</p>
        </section>
        <Button
          onClick={() =>
            modal(
              "¡Te uniste al club!",
              "Confirmación de demostración. No se ha creado una membresía real.",
            )
          }
        >
          <span className="join-symbol" aria-hidden="true">⊕</span> Unirme al club
        </Button>
      </main>
    </>
  );
}
export function CreateClub() {
  const n = useNavigate();
  const { notify } = useUI();
  return (
    <>
      <Header title="Crear club" />
      <main>
        <Back />
        <h1>Crea tu propio espacio</h1>
        <form
          className="stack"
          onSubmit={(e) => {
            e.preventDefault();
            notify("Club creado de forma provisional.");
            n("/comunidad");
          }}
        >
          <label>
            Nombre del club
            <input placeholder="El nombre de tu comunidad" required />
          </label>
          <label>
            Género
            <select>
              <option>Romance</option>
              <option>Fantasía</option>
              <option>Misterio</option>
              <option>Terror</option>
            </select>
          </label>
          <label>
            Descripción
            <textarea placeholder="¿Qué historias van a compartir?" required />
          </label>
          <label>
            Privacidad
            <select>
              <option>Público</option>
              <option>Privado</option>
            </select>
          </label>
          <Button type="submit">Crear club</Button>
        </form>
      </main>
    </>
  );
}
