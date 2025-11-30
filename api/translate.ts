import { GoogleGenAI } from "@google/genai";

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

  const { text } = await req.json();
  if (!text?.trim()) return new Response("Missing text", { status: 400 });

  const apiKey = process.env.API_KEY;
  if (!apiKey) return new Response("API_KEY missing", { status: 500 });

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Translate the following English text to Thai directly. Only the Thai translation.\n\nText: "${text}"`,
  });

  const result = (response as any)?.text ?? "";
  return new Response(JSON.stringify({ result }), {
    headers: { "Content-Type": "application/json" },
  });
}
