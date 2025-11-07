// components/FormPedido.jsx
import { useState } from "react";

export default function FormPedido({ onCreate }) {
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

  const allFilled = Object.values(form).every((v) => v && v.trim() !== "");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!allFilled) return alert("Completa todos los campos");
        onCreate(form);
      }}
    >
      <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} />
      <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
      <input name="dominio" placeholder="Dominio" value={form.dominio} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <select name="tipoTramite" value={form.tipoTramite} onChange={handleChange}>
        <option value="">Tipo de trámite</option>
        <option value="informe">Informe de dominio</option>
        <option value="certificado">Certificado</option>
      </select>

      <button type="submit" disabled={!allFilled}>Siguiente / Guardar</button>
    </form>
  );
}
