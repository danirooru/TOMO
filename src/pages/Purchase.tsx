import { useStore } from "../store";
import { subtotal, editionById } from "../model";
import { CartItem, EmptyCart } from "../commerce";
import { Image } from "../media";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cover, getBook, type Book } from "../data";
import { Header, Back, Icon, Button, Action, useUI } from "../components";
const money = (n: number) => `$${n.toFixed(2)} MXN`;
export function PaymentSummary({ amount }: { amount: number }) {
  return (
    <section className="panel payment-summary">
      <h2>Resumen de compra</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{money(amount)}</dd>
        </div>
        <div className="discount">
          <dt>Descuento (Cupón -10%)</dt>
          <dd>-{money(amount * 0.1)}</dd>
        </div>
        <div>
          <dt>
            Envío estándar<small>Beneficio TOMO</small>
          </dt>
          <dd>GRATIS</dd>
        </div>
        <div className="total">
          <dt>
            Total<small>IVA incluido</small>
          </dt>
          <dd>{money(amount * 0.9)}</dd>
        </div>
      </dl>
    </section>
  );
}
export function Checkout() {
  const { id } = useParams();
  const store = useStore();
  const { state } = store;
  const [outcome, setOutcome] = useState("rechazado");
  const n = useNavigate();
  const { modal, notify } = useUI();
  const legacyAdded = useRef<string | null>(null);
  // Compatibilidad con las rutas antiguas de compra directa, sin duplicar al recargar.
  useEffect(() => {
    if (id && getBook(id) && !state.cart.length && legacyAdded.current !== id) {
      legacyAdded.current = id;
      store.add(id);
    }
  }, [id]);
  const amount = subtotal(state.cart);
  const first = state.cart[0] && editionById(state.cart[0].editionId);
  if (!first)
    return (
      <>
        <Header title="Checkout" back userIcon />
        <main>
          <EmptyCart />
        </main>
      </>
    );
  return (
    <>
      <Header title="Checkout" back userIcon />
      <main className="checkout">
        <p className="demo-caption">Ediciones y precios de demostración</p>
        {state.cart.map((line) => (
          <CartItem key={line.editionId} line={line} />
        ))}
        <label className="coupon-label" htmlFor="coupon">
          Código de descuento o regalo
        </label>
        <div className="coupon">
          <input id="coupon" defaultValue="LEER2026" />
          <Button
            onClick={() =>
              notify("Cupón LEER2026 (10% OFF) aplicado en esta demostración.")
            }
          >
            Aplicar
          </Button>
        </div>
        <small className="discount">⊙ Cupón LEER2026 (10% OFF)</small>
        <PaymentSummary amount={amount} />
        <div className="between payment-label">
          <span>Método de pago</span>
          <button
            className="text-button"
            onClick={() =>
              modal(
                "Método de pago",
                "Visa •••• 4821 · Vence 09/28. Datos ficticios para recorrer el prototipo.",
              )
            }
          >
            Gestionar
          </button>
        </div>
        <button
          className="payment-method"
          onClick={() =>
            modal(
              "Método de pago",
              "Esta tarjeta es de demostración. No se recopilan datos bancarios ni se procesa un cobro.",
            )
          }
        >
          <Icon name="tarjeta" />
          <span>
            <b>Visa •••• 4821</b>
            <small>Vence 09/28</small>
          </span>
          <span className="pill pale">Predeterminada</span>
          <span>›</span>
        </button>
        <div className="pay-button">
          <Button
            onClick={() => {
              store.captureOrder();
              n(`/${outcome}/${first.bookId}`);
            }}
          >
            <Icon name="candado" />
            Pagar ahora <strong>{money(amount * 0.9)}</strong>
          </Button>
        </div>
        <label className="simulation">
          Resultado de la simulación
          <select value={outcome} onChange={(e) => setOutcome(e.target.value)}>
            <option value="rechazado">Pago rechazado</option>
            <option value="seguimiento">Pago aprobado → Seguimiento</option>
          </select>
        </label>
      </main>
    </>
  );
}
export function Rejected() {
  const { id } = useParams();
  const b = getBook(id);
  const { state } = useStore();
  const { modal } = useUI();
  if (!b) return null;
  return (
    <>
      <Header title="Error" titleOnly hideAvatar />
      <main className="rejected">
        <div className="between">
          <Link to="/carrito" className="return-cart"><Icon name="regresar" /> Volver al carrito</Link>
          <span className="pill pale">Paso 2 de 2</span>
        </div>
        <div className="error-copy">
          <span className="error-icon">
            <Icon name="pago-rechazado" />
          </span>
          <h1>No se aprobó el pago</h1>
          <p>Revisa tu tarjeta o intenta con otro método de pago.</p>
        </div>
        <section className="panel error-summary">
          <dl>
            <div>
              <dt>Pago de</dt>
              <dd>
                Carrito (
                {state.order?.units ||
                  state.cart.reduce((n, l) => n + l.quantity, 0)}{" "}
                unidades)
              </dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>
                <strong>
                  {money(state.order?.total ?? subtotal(state.cart) * 0.9)}
                </strong>
              </dd>
            </div>
            <div>
              <dt>Método</dt>
              <dd>▱ Visa •••• 4821</dd>
            </div>
            <div>
              <dt>Referencia</dt>
              <dd>
                <code>TOMO-ERR-98421</code>
              </dd>
            </div>
          </dl>
        </section>
        <div className="error-actions">
          <Button
            onClick={() =>
              modal(
                "Cambiar método de pago",
                "Método provisional: Visa •••• 4821. Regresa al carrito para seleccionar el resultado de la simulación.",
              )
            }
          >
            <Icon name="metodo-pago" />
            Cambiar método de pago
          </Button>
          <Action to={`/seguimiento/${b.id}`} soft>
            <Icon name="repetir" />
            Reintentar con el mismo método
          </Action>
          <Button
            soft
            onClick={() =>
              modal(
                "Contactar soporte",
                "Canal de soporte provisional. No se enviará ningún mensaje.",
              )
            }
          >
            <Icon name="soporte" />
            Contactar soporte <small>Respuesta en menos de 5 min</small>
          </Button>
        </div>
      </main>
    </>
  );
}
export function Tracking() {
  const { id } = useParams();
  const b = getBook(id);
  const { state } = useStore();
  const { modal, notify } = useUI();
  if (!b) return null;
  return (
    <>
      <Header userIcon />
      <main className="tracking">
        <div className="tracking-title">
          <Back to="/pedidos" />
          <h1>Mi pedido</h1>
        </div>
        <article className="order-confirmed">
          <Image src={cover(b)} alt={`Portada de ${b.title}`} />
          <div>
            <h2>Pedido confirmado ✓</h2>
            <p>N° de pedido #TM-2026-8841</p>
            <span className="pill pale">▣ Llega el jueves 19 de nov.</span>
          </div>
        </article>
        {state.order && (
          <section className="panel order-editions">
            <h2>Libros de tu pedido</h2>
            {state.order.lines.map((line) => {
              const edition = editionById(line.editionId)!;
              return (
                <p key={edition.id}>
                  {getBook(edition.bookId)!.title} · {edition.language} ×{" "}
                  {line.quantity}
                </p>
              );
            })}
            <b>Total: {money(state.order.total)}</b>
          </section>
        )}
        <section className="timeline-card">
          <div className="between">
            <h2>ESTADO DEL ENVÍO</h2>
            <small className="pill pale">Actualizado hace 12 min</small>
          </div>
          <ol className="timeline">
            {[
              ["Confirmado", "10:30 AM", "Pago validado y orden registrada"],
              [
                "Preparando",
                "02:15 PM",
                "Empacado con cuidado artesanal e infusión de aroma",
              ],
              [
                "En camino",
                "En tránsito",
                "En ruta con el mensajero local de TOMO Express",
              ],
              [
                "Entregado",
                "Est. 19 Nov",
                "Pendiente de recepción en domicilio",
              ],
            ].map(([title, time, desc], i) => (
              <li
                className={i < 2 ? "done" : i === 2 ? "current" : "pending"}
                key={title}
              >
                <div className="between">
                  <h3>
                    {title} {i === 2 && <span className="pill">ACTIVO</span>}
                  </h3>
                  <small>{time}</small>
                </div>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="guide panel">
          <Icon name="transporte" />
          <div>
            <small>GUÍA DE PAQUETERÍA</small>
            <b>DHL Express: 8492049182</b>
          </div>
          <button
            className="button small"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("8492049182");
                notify("Guía copiada: 8492049182");
              } catch {
                modal(
                  "Número de guía",
                  "8492049182 · Puedes seleccionar y copiar este número.",
                );
              }
            }}
          >
            ▣ Copiar
          </button>
        </section>
        <Button
          onClick={() =>
            modal(
              "¡Qué disfrutes tu lectura!",
              "Confirmación de recepción provisional.",
            )
          }
        >
          <Icon name="caja" />
          Ya lo recibí
        </Button>
        <Button
          soft
          onClick={() =>
            modal(
              "Reportar un problema",
              "Formulario de soporte provisional. Tu pedido de demostración no es una compra real.",
            )
          }
        >
          <Icon name="soporte" />
          Reportar un problema
        </Button>
      </main>
    </>
  );
}
