// pages/api/pedido.js
// pages/api/webhook.js
import { adminDb } from "@/lib/firebaseAdmin";
import nodemailer from "nodemailer";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    const payment = req.body; // MercadoPago sends an object - verify structure
    // Dependiendo del type/structure que mande MP
    const pedidoId = payment?.data?.metadata?.pedidoId || payment?.metadata?.pedidoId;

    const status = payment?.data?.status || payment?.status;

    if (pedidoId && status === "approved") {
      const docRef = adminDb.collection("pedidos").doc(pedidoId);
      await docRef.update({ estadoPago: "aprobado", fechaPago: new Date().toISOString() });

      // obtener datos del pedido para enviar mail
      const pedidoSnap = await docRef.get();
      const pedidoData = pedidoSnap.data();
      const clienteEmail = pedidoData?.email;
      const clienteNombre = pedidoData?.nombre || "Cliente";

      // Enviar email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `GMC Automotor <${process.env.EMAIL_USER}>`,
        to: clienteEmail,
        bcc: "cesar@gmcautomotor.com",
        subject: "Confirmación de pago - Informe de dominio",
        text: `Hola ${clienteNombre}, tu pago fue recibido. En breve recibirás tu informe.`,
      });
    }

    return res.status(200).end();
  } catch (error) {
    console.error("webhook error", error);
    return res.status(500).json({ error: error.message });
  }
}

