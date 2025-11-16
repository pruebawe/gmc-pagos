export default function PagoExitoso() {
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#16a34a" }}>
        ¡Pago realizado con éxito! 🎉
      </h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Hemos recibido tu pago correctamente.  
        En unos minutos nos pondremos en contacto para continuar con el trámite.
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
          href="https://wa.me/5493816173184?text=Hola,%20realicé%20el%20pago%20del%20trámite."
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
