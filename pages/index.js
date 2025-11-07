// pages/index.js
import { useState } from "react";
import FormPedido from "@/components/FormPedido";

export default function Home() {
  const [pedidoId, setPedidoId] = useState(null);

  const crearPedido = async (data) => {
    const res = await fetch("/api/pedido", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.id) {
      setPedidoId(json.id);
      // redirigir a pago o mostrar botón pagar
    } else {
      alert("Error guardando pedido");
    }
  };

  const irAPagar = async () => {
    // llamar /api/pago para obtener init_point
    const res = await fetch("/api/pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pedidoId, nombre: "Cliente", email: "cliente@example.com" }),
    });
    const json = await res.json();
    if (json.init_point) window.location.href = json.init_point;
    else alert("No se pudo iniciar pago");
  };

  return (
    <div>
      <h1>GMC Pagos</h1>
      {!pedidoId ? (
        <FormPedido onCreate={crearPedido} />
      ) : (
        <div>
          <p>Pedido creado: {pedidoId}</p>
          <button onClick={irAPagar}>Pagar</button>
        </div>
      )}
    </div>
  );
}
