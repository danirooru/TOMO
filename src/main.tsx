import { StoreProvider } from "./store";
import { Cart } from "./commerce";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { BottomNav, UIProvider, Action } from "./components";
import { Splash, Session, Preferences } from "./pages/Access";
import { Home, Recommendations } from "./pages/Home";
import { Search } from "./pages/Search";
import { BookDetail, Reviews } from "./pages/BookDetail";
import { Shelf, ShelfDetail } from "./pages/Shelf";
import { WriteReview } from "./pages/WriteReview";
import { Community, ClubDetail, CreateClub } from "./pages/Community";
import { Profile, Rewards, Orders } from "./pages/Profile";
import { Checkout, Rejected, Tracking } from "./pages/Purchase";
import "./styles.css";
function App() {
  const { pathname } = useLocation();
  const access = ["/", "/sesion", "/registro", "/preferencias"].includes(
    pathname,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `TOMO · ${pathname === "/" ? "Bienvenido" : pathname.split("/")[1]}`;
    document.querySelector("main")?.setAttribute("tabindex", "-1");
    document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <UIProvider>
      <div className={`app ${access ? "access-shell" : ""}`}>
        <button
          className="skip-link"
          onClick={() => document.querySelector<HTMLElement>("main")?.focus()}
        >
          Ir al contenido
        </button>
        <div id="contenido">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/sesion" element={<Session />} />
            <Route path="/registro" element={<Session register />} />
            <Route path="/preferencias" element={<Preferences />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/buscar" element={<Search />} />
            <Route path="/recomendaciones" element={<Recommendations />} />
            <Route path="/libro/:id" element={<BookDetail />} />
            <Route path="/libro/:id/resenas" element={<Reviews />} />
            <Route path="/libro/:id/escribir" element={<WriteReview />} />
            <Route path="/estante" element={<Shelf />} />
            <Route path="/estante/:id" element={<ShelfDetail />} />
            <Route path="/comunidad" element={<Community />} />
            <Route path="/comunidad/:id" element={<ClubDetail />} />
            <Route path="/crear-club" element={<CreateClub />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/recompensas" element={<Rewards />} />
            <Route path="/pedidos" element={<Orders />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/rechazado/:id" element={<Rejected />} />
            <Route path="/seguimiento/:id" element={<Tracking />} />
            <Route
              path="*"
              element={
                <main>
                  <h1>Página no encontrada</h1>
                  <Action to="/inicio">Ir a Inicio</Action>
                </main>
              }
            />
          </Routes>
        </div>
        {!access && <BottomNav />}
      </div>
    </UIProvider>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </StoreProvider>
  </StrictMode>,
);
