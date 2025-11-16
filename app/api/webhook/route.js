import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("📩 Webhook recibido:", body);

    // Solo procesamos pagos
    if (body.type !== "payment") {
      return NextResponse.json({ status: "ignored" });
    }

    const payment_id = body.data.id;

    // 1️⃣ Obtener datos completos del pago
    const resPago = await fetch(
      `https://api.mercadopago.com/v1/payments/${payment_id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );

    const pago = await resPago.json();

    console.log("💰 Pago consultado:", pago);

    const { status, status_detail, preference_id, date_approved, transaction_amount } = pago;

    // 2️⃣ Buscar pedido en JSON Server usando preference_id
    const resPedido = await fetch(
      `http://localhost:3001/posts?preference_id=${preference_id}`
    );

    const pedidos = await resPedido.json();

    if (pedidos.length === 0) {
      console.log("❌ Pedido no encontrado");
      return NextResponse.json({ status: "pedido_not_found" });
    }

    const pedido = pedidos[0];

    // 3️⃣ Guardar todos los datos relevantes del pago
    await fetch(`http://localhost:3001/posts/${pedido.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payment_id,
        pago_estado: status,
        pago_detalle: status_detail,
        fecha_pago: date_approved,
        monto_pago: transaction_amount
      }),
    });

    console.log("✅ Pago actualizado en JSON Server");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Error en webhook:", error);
    return NextResponse.json({ error: "webhook error" }, { status: 500 });
  }
}
