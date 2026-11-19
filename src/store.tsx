import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  addLine,
  changeEdition,
  editionsFor,
  initialStore,
  restoreStore,
  setReading,
  subtotal,
  cents,
  editionById,
  type Store,
  type Reading,
} from "./model";
const KEY = "tomo-state-v2";
function read() {
  try {
    return restoreStore(JSON.parse(localStorage.getItem(KEY) || "null"));
  } catch {
    return initialStore();
  }
}
function useStoreState() {
  const [state, setState] = useState<Store>(read);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);
  return {
    state,
    storageError,
    selectedEdition: (id: string) =>
      editionsFor(id).find((e) => e.id === state.selected[id] && e.available) ||
      editionsFor(id).find((e) => e.available)!,
    selectEdition: (id: string, editionId: string) =>
      setState((s) =>
        editionsFor(id).some((e) => e.id === editionId && e.available)
          ? { ...s, selected: { ...s.selected, [id]: editionId } }
          : s,
      ),
    add: (id: string, editionId?: string) =>
      setState((s) => ({
        ...s,
        cart: addLine(
          s.cart,
          editionId ||
            s.selected[id] ||
            editionsFor(id).find((e) => e.available)!.id,
        ),
      })),
    quantity: (id: string, q: number) =>
      setState((s) => ({
        ...s,
        cart: s.cart.flatMap((l) =>
          l.editionId === id
            ? q > 0 && Number.isSafeInteger(q)
              ? [{ ...l, quantity: q }]
              : []
            : [l],
        ),
      })),
    remove: (id: string) =>
      setState((s) => ({
        ...s,
        cart: s.cart.filter((l) => l.editionId !== id),
      })),
    change: (from: string, to: string) =>
      setState((s) => ({
        ...s,
        cart: changeEdition(s.cart, from, to),
        selected:
          editionById(to)?.available &&
          editionById(from)?.bookId === editionById(to)?.bookId
            ? { ...s.selected, [editionById(to)!.bookId]: to }
            : s.selected,
      })),
    setGoal: (goal: number) =>
      setState((s) => ({
        ...s,
        goal: Math.max(1, Math.min(1000, Math.round(goal))),
      })),
    setGenres: (genres: string[]) => setState((s) => ({ ...s, genres })),
    setStatus: (id: string, status: Reading["status"]) =>
      setState((s) => setReading(s, id, status)),
    captureOrder: () =>
      setState((s) => ({
        ...s,
        order: {
          lines: s.cart.map((l) => ({ ...l })),
          subtotal: subtotal(s.cart),
          total: cents(subtotal(s.cart) * 0.9),
          units: s.cart.reduce((n, l) => n + l.quantity, 0),
        },
      })),
  };
}
const Context = createContext<ReturnType<typeof useStoreState> | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useStoreState();
  return (
    <Context.Provider value={store}>
      {children}
      {store.storageError && (
        <p className="storage-notice" role="alert">
          El navegador no permite guardar tus cambios. Se conservarán durante
          esta sesión.
        </p>
      )}
    </Context.Provider>
  );
}
export function useStore() {
  const s = useContext(Context);
  if (!s) throw Error("Falta StoreProvider");
  return s;
}
