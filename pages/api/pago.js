// pages/api/pago.js
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const { id, nombre, email } = req.body;
    const preference = {
      items: [
        {
          title: "Informe de dominio",
          quantity: 1,
          unit_price: 5500
        }
      ],
      payer: { email: email || "no-email@example.com" },
      metadata: { pedidoId: id },
      back_urls: {
        success: `${process.env.APP_BASE_URL}/success`,
        failure: `${process.env.APP_BASE_URL}/failure`,
      },
      auto_return: "approved",
      binary_mode: false
    };

    const mpRes = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: mpRes.body.init_point });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
