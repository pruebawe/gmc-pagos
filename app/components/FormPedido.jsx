// components/FormPedido.jsx
"use client";
import { useState } from "react";

export default function FormPedido() {
  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    dominio: "",
    email: "",
    tipoTramite: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Guardamos el pedido en JSON Server
      const resPedido = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!resPedido.ok) throw new Error("Error al guardar el pedido");

      const pedidoGuardado = await resPedido.json();
      console.log("📝 Pedido guardado:", pedidoGuardado);

      // 2️⃣ Creamos la preferencia de pago en Next.js
      const resPago = await fetch("/api/pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          telefono: form.dni,
          patente: form.dominio,
        }),
      });

      const dataPago = await resPago.json();
      console.log("💰 Respuesta de pago:", dataPago);

      // 3️⃣ Guardar preference_id dentro del pedido en JSON Server
      await fetch(`http://localhost:3001/posts/${pedidoGuardado.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preference_id: dataPago.id, // MUY IMPORTANTE
        }),
      });

      console.log("🔗 preference_id guardado en el pedido");

      // 4️⃣ Redirigir al checkout de Mercado Pago
      window.location.href = dataPago.init_point;
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Hubo un error al procesar el pedido");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={handleChange}
      />
      <input
        name="dni"
        placeholder="DNI"
        value={form.dni}
        onChange={handleChange}
      />
      <input
        name="dominio"
        placeholder="Dominio"
        value={form.dominio}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <select
        name="tipoTramite"
        value={form.tipoTramite}
        onChange={handleChange}
      >
        <option value="">Tipo de trámite</option>
        <option value="informe">Informe de dominio</option>
        <option value="multas">Informe de multas</option>
        <option value="historico">Informe histórico de titulares</option>
      </select>

      <button type="submit">Siguiente / Pagar</button>
    </form>
  );
}
