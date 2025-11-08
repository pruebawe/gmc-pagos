import { db } from "@/lib/firebase"; // client SDK can be used but prefer admin for server
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  try {
    const pedido = req.body;
    const docRef = await addDoc(collection(db, "pedidos"), {
      ...pedido,
      estadoPago: "pendiente",
      fecha: new Date().toISOString(),
    });
    return res.status(200).json({ id: docRef.id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
}
