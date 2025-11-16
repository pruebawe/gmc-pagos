import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req) {
  try {
    const datos = await req.json();

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: "Pago de trámite",
            quantity: 1,
            unit_price: 12000,
          },
        ],
        back_urls: {
          success: "https://gmc-pagos.loca.lt/pago-exitoso",
          failure: "https://gmc-pagos.loca.lt/pago-fallido",
          pending: "https://gmc-pagos.loca.lt/pago-pendiente",
        },
        auto_return: "approved",
        notification_url: "https://gmc-pagos.loca.lt/api/webhook", // 🔥
      },
    });

    return NextResponse.json({
      init_point: result.init_point,
      id: result.id, // preference_id
    });
  } catch (error) {
    console.error("❌ ERROR MERCADOPAGO:", error);
    return NextResponse.json(
      { error: "Error creando preferencia" },
      { status: 500 }
    );
  }
}
