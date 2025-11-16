export default function PagoPendiente() {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#f59e0b" }}>
        🕓 Pago pendiente
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        El pago aún no fue confirmado.  
        Apenas Mercado Pago lo apruebe, te vamos a notificar.
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
          href="https://wa.me/5493810000000?text=Hola,%20mi%20pago%20figura%20como%20pendiente.%20Podrían%20verificarlo?"
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
