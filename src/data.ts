export type Book = {
  id: string;
  title: string;
  author: string;
  asset: number | null;
  reviews: string;
  genre: string;
  rating: number;
  price: number;
  synopsis: string;
  status: "Leyendo" | "Quiero leer" | "Leído";
};
const rows: [
  string,
  string,
  string,
  number | null,
  string,
  number,
  number,
  string,
][] = [
  [
    "cementerio",
    "Cementerio de animales",
    "Stephen King",
    29,
    "Terror",
    4.6,
    286,
    "Louis Creed y su familia descubren que, más allá de un antiguo cementerio de animales, hay un lugar donde la muerte no es el final. Una historia sobre el amor, la pérdida y los límites que estamos dispuestos a cruzar.",
  ],
  [
    "klara",
    "Klara y el sol",
    "Kazuo Ishiguro",
    31,
    "Ciencia ficción",
    4.5,
    310,
    "Desde el escaparate de una tienda, Klara observa el mundo con curiosidad. Su encuentro con Josie abre una historia sobre el amor, la esperanza y lo que significa ser humano.",
  ],
  [
    "almendra",
    "Almendra",
    "Won-pyung Sohn",
    32,
    "Ficción contemporánea",
    4.7,
    245,
    "Yunjae tiene dificultades para reconocer las emociones. Una amistad inesperada transforma su manera de mirar el mundo y de acercarse a los demás.",
  ],
  [
    "sombra",
    "La sombra del viento",
    "Carlos Ruiz Zafón",
    20,
    "Misterio",
    4.9,
    299,
    "En la Barcelona de posguerra, Daniel Sempere descubre un libro en el Cementerio de los Libros Olvidados. Su búsqueda del autor lo conduce a un laberinto de secretos.",
  ],
  [
    "cien",
    "Cien años de soledad",
    "Gabriel García Márquez",
    18,
    "Realismo mágico",
    4.8,
    289,
    "En la mítica y deslumbrante aldea de Macondo, siete generaciones de la familia Buendía viven marcadas por la soledad, amores desaforados y prodigios sobrenaturales que funden realidad y poesía.",
  ],
  [
    "noche",
    "Nuestra parte de noche",
    "Mariana Enríquez",
    19,
    "Terror",
    4.7,
    349,
    "Un padre y su hijo atraviesan Argentina mientras intentan escapar del destino que les impone una sociedad secreta. Una historia de herencia, oscuridad y resistencia.",
  ],
  [
    "principito",
    "El Principito",
    "Antoine de Saint-Exupéry",
    22,
    "Literatura clásica",
    4.9,
    189,
    "Un pequeño viajero recorre planetas y conoce a personajes que le enseñan a mirar más allá de las apariencias. Una historia sobre la amistad y lo esencial.",
  ],
  [
    "tokio",
    "Tokio Blues",
    "Haruki Murakami",
    23,
    "Ficción contemporánea",
    4.6,
    299,
    "Toru recuerda sus años de juventud en Tokio y los vínculos que marcaron su vida. Una historia de amor, memoria y búsqueda personal.",
  ],
  [
    "corte",
    "Una corte de rosas y espinas",
    "Sarah J. Maas",
    25,
    "Fantasía",
    4.7,
    399,
    "Feyre es llevada a una tierra mágica después de matar a un lobo. Allí descubre que el mundo de las hadas esconde una amenaza que puede cambiarlo todo.",
  ],
  [
    "heartless",
    "Heartless",
    "Marissa Meyer",
    27,
    "Fantasía",
    4.7,
    329,
    "Antes de convertirse en la Reina de Corazones, Catherine soñaba con abrir una pastelería. El amor y las decisiones cambian su destino en el País de las Maravillas.",
  ],
  [
    "percy",
    "Percy Jackson y los dioses del Olimpo",
    "Rick Riordan",
    28,
    "Fantasía",
    4.8,
    279,
    "Percy descubre que los mitos griegos forman parte de su mundo y emprende una aventura para encontrar el rayo robado de Zeus.",
  ],
  [
    "mujercitas",
    "Mujercitas",
    "Louisa May Alcott",
    30,
    "Literatura clásica",
    4.8,
    249,
    "Las hermanas March crecen entre sueños, dificultades y afectos. Sus historias celebran la familia, la independencia y los caminos de cada una.",
  ],
  [
    "reina",
    "La reina roja",
    "Victoria Aveyard",
    26,
    "Fantasía",
    4.6,
    319,
    "En un mundo dividido por el color de la sangre, Mare descubre un poder que amenaza el orden establecido y la arrastra al centro de una rebelión.",
  ],
  [
    "hamnet",
    "Hamnet",
    "Maggie O’Farrell",
    21,
    "Ficción íntima",
    4.7,
    329,
    "En la Inglaterra del siglo XVI, una familia afronta una pérdida que transforma sus vidas. Una novela sobre los vínculos, la memoria y la creación.",
  ],
  [
    "casa",
    "La casa en el mar más azul",
    "TJ Klune",
    null,
    "Fantasía",
    4.7,
    329,
    "Linus Baker llega a una isla para conocer a un grupo de niños extraordinarios. Una historia de afecto, pertenencia y familias inesperadas.",
  ],
  [
    "viento",
    "El nombre del viento",
    "Patrick Rothfuss",
    null,
    "Fantasía",
    4.8,
    399,
    "Kvothe cuenta la historia de su infancia, sus años de aprendizaje y el camino que lo convirtió en leyenda.",
  ],
  [
    "frankenstein",
    "Frankenstein",
    "Mary Shelley",
    24,
    "Literatura clásica",
    4.5,
    229,
    "Victor Frankenstein crea una vida y se enfrenta a las consecuencias de abandonarla. Una reflexión sobre la soledad, la responsabilidad y el deseo de pertenecer.",
  ],
];
export const books: Book[] = rows.map(
  ([id, title, author, asset, genre, rating, price, synopsis], i) => ({
    id,
    title,
    author,
    asset,
    genre,
    rating,
    price,
    synopsis,
    reviews:
      (
        {
          cementerio: "2,310",
          klara: "1,840",
          almendra: "1,750",
          sombra: "3,420",
          cien: "2,890",
          heartless: "1,750",
        } as Record<string, string>
      )[id] || "1,248",
    status: i % 3 === 0 ? "Leído" : i % 3 === 1 ? "Leyendo" : "Quiero leer",
  }),
);
export const getBook = (id?: string) => books.find((b) => b.id === id);
export const cover = (b: Book) =>
  b.asset
    ? `/assets/imagenes/libros/legalAsset ${b.asset}@300x.png`
    : `/assets/imagenes/libros/${b.id}-sin-portada.svg`;
export const clubs = [
  {
    id: "paginas",
    title: "Entre páginas",
    genre: "Romance",
    image: "01-comunidad.png",
    description:
      "Un espacio para compartir historias que nos hacen sentir, debatir giros inesperados y enamorarnos de cada página.",
    members: 128,
    reading: "La casa en el mar más azul",
    author: "TJ Klune",
    book: "casa",
    label: "Miembro",
  },
  {
    id: "medianoche",
    title: "Después de medianoche",
    genre: "Terror y misterio",
    image: "02-comunidad.png",
    description:
      "Para quienes disfrutan las historias más inquietantes, el horror folclórico y los thrillers psicológicos.",
    members: 86,
    reading: "Nuestra parte de noche",
    author: "Mariana Enríquez",
    book: "noche",
    label: "Privado",
  },
  {
    id: "universos",
    title: "Universos de tinta",
    genre: "Fantasía",
    image: "03-comunidad.png",
    description:
      "Exploramos mundos extraordinarios, magia y sagas épicas un libro a la vez. Siempre listos para teorizar.",
    members: 215,
    reading: "El nombre del viento",
    author: "Patrick Rothfuss",
    book: "viento",
    label: "Público",
  },
];
