import { books } from "./data";
export type Language = "Español" | "Inglés";
export type Edition = {
  id: string;
  bookId: string;
  language: Language;
  name: string;
  price: number;
  available: boolean;
};
export const editions: Edition[] = books.flatMap((b, i) =>
  (["Español", "Inglés"] as Language[]).map((language, j) => ({
    id: `${b.id}-${j ? "en" : "es"}`,
    bookId: b.id,
    language,
    name: "Rústica · edición demo",
    price: b.price + (j ? 35 : 0),
    available: !j || i % 4 !== 3,
  })),
);
export const editionsFor = (id: string) =>
  editions.filter((e) => e.bookId === id);
export const editionById = (id: string) => editions.find((e) => e.id === id);
export type CartLine = { editionId: string; quantity: number };
export type Reading = {
  status: "Leído" | "Leyendo" | "Quiero leer";
  page: number;
  pages: number;
  completedYear?: number;
};
export type Order = {
  lines: CartLine[];
  subtotal: number;
  total: number;
  units: number;
};
export type Store = {
  goal: number;
  genres: string[];
  reading: Record<string, Reading>;
  selected: Record<string, string>;
  cart: CartLine[];
  order?: Order;
};
export const currentYear = () => new Date().getFullYear();
export function initialStore(): Store {
  return {
    goal: 12,
    genres: ["Romance", "Fantasía", "Ciencia ficción"],
    cart: [],
    selected: {},
    reading: Object.fromEntries(
      books.map((b, i) => {
        const read = [
          "cementerio",
          "sombra",
          "principito",
          "heartless",
        ].includes(b.id);
        const pages = b.id === "cien" ? 471 : 240 + i * 17;
        return [
          b.id,
          {
            status: read
              ? "Leído"
              : b.id === "cien" || b.id === "noche"
                ? "Leyendo"
                : "Quiero leer",
            page: read
              ? pages
              : b.id === "cien"
                ? 248
                : b.id === "noche"
                  ? 120
                  : 0,
            pages,
            completedYear: read ? currentYear() : undefined,
          },
        ];
      }),
    ),
  };
}
export const cents = (v: number) => Math.round(v * 100) / 100;
export const subtotal = (lines: CartLine[]) =>
  cents(
    lines.reduce(
      (sum, l) => sum + (editionById(l.editionId)?.price || 0) * l.quantity,
      0,
    ),
  );
export function addLine(
  lines: CartLine[],
  editionId: string,
  quantity = 1,
): CartLine[] {
  if (
    !editionById(editionId)?.available ||
    !Number.isInteger(quantity) ||
    quantity < 1
  )
    return lines;
  const found = lines.find((l) => l.editionId === editionId);
  return found
    ? lines.map((l) =>
        l.editionId === editionId
          ? { ...l, quantity: l.quantity + quantity }
          : l,
      )
    : [...lines, { editionId, quantity }];
}
export function changeEdition(
  lines: CartLine[],
  from: string,
  to: string,
): CartLine[] {
  if (from === to) return lines;
  const old = lines.find((l) => l.editionId === from);
  const a = editionById(from),
    b = editionById(to);
  if (!old || !b?.available || a?.bookId !== b.bookId) return lines;
  const target = lines.find((l) => l.editionId === to);
  return target
    ? lines
        .filter((l) => l.editionId !== from)
        .map((l) =>
          l.editionId === to
            ? { ...l, quantity: l.quantity + old.quantity }
            : l,
        )
    : lines.map((l) => (l.editionId === from ? { ...l, editionId: to } : l));
}
export function goalStats(s: Store) {
  const read = Object.values(s.reading).filter(
    (r) => r.status === "Leído" && r.completedYear === currentYear(),
  ).length;
  return {
    read,
    percent: Math.round((read / s.goal) * 100),
    remaining: Math.max(0, s.goal - read),
  };
}
export function setReading(
  s: Store,
  id: string,
  status: Reading["status"],
): Store {
  const old = s.reading[id];
  if (!old) return s;
  return {
    ...s,
    reading: {
      ...s.reading,
      [id]: {
        ...old,
        status,
        page:
          status === "Leído"
            ? old.pages
            : old.page === old.pages
              ? 0
              : old.page,
        completedYear:
          status === "Leído" ? old.completedYear || currentYear() : undefined,
      },
    },
  };
}
export function restoreStore(value: unknown): Store {
  const base = initialStore();
  if (!value || typeof value !== "object") return base;
  const v = value as Partial<Store>;
  if (Number.isInteger(v.goal) && v.goal! > 0 && v.goal! <= 1000)
    base.goal = v.goal!;
  if (Array.isArray(v.genres))
    base.genres = v.genres.filter((g) => typeof g === "string");
  for (const b of books) {
    const r = v.reading?.[b.id];
    if (
      r &&
      ["Leyendo", "Leído", "Quiero leer"].includes(r.status) &&
      Number.isInteger(r.page) &&
      Number.isInteger(r.pages) &&
      r.pages > 0 &&
      r.page >= 0 &&
      r.page <= r.pages
    )
      base.reading[b.id] = r;
    const e = editionById(v.selected?.[b.id] || "");
    if (e?.available && e.bookId === b.id) base.selected[b.id] = e.id;
  }
  if (Array.isArray(v.cart))
    for (const l of v.cart) {
      if (l && Number.isSafeInteger(l.quantity) && l.quantity > 0)
        base.cart = addLine(base.cart, l.editionId, l.quantity);
    }
  if (v.order && Array.isArray(v.order.lines)) {
    const lines = v.order.lines.reduce<CartLine[]>(
      (all, l) =>
        Number.isSafeInteger(l.quantity) && l.quantity > 0
          ? addLine(all, l.editionId, l.quantity)
          : all,
      [],
    );
    if (lines.length)
      base.order = {
        lines,
        subtotal: subtotal(lines),
        total: cents(subtotal(lines) * 0.9),
        units: lines.reduce((sum, l) => sum + l.quantity, 0),
      };
  }
  return base;
}
