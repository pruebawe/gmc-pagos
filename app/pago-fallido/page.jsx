export default function PagoFallido() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#dc2626" }}>
        ❌ El pago no pudo completarse
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Ocurrió un problema y el pago no fue procesado.  
        Por favor, intentá nuevamente o comunicate para recibir ayuda.
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
        <a
          href="/"
          style={{
            padding: "0.8rem 1.6rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Volver al inicio
        </a>

        <a
          href="https://wa.me/5493816173184?text=Hola,%20tuve%20un%20problema%20al%20realizar%20el%20pago."
          target="_blank"
          style={{
            padding: "0.8rem 1.6rem",
            backgroundColor: "#10b981",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}
