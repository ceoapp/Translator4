import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment");
  }
  return new GoogleGenAI({ apiKey });
};

export const translateText = async (text: string): Promise<string> => {
  if (!text.trim()) return "";

  try {
    const ai = getClient();
    
    // Using gemini-2.5-flash for speed and efficiency in text tasks
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Translate the following English text to Thai directly. Do not provide pronunciation, romanization, or explanations. Only provide the Thai script translation.\n\nText: "${text}"`,
    });

    const translatedText = response.text;
    if (!translatedText) {
      throw new Error("No translation returned from the model.");
    }
    
    return translatedText.trim();
  } catch (error) {
    console.error("Translation error:", error);
    throw error;
  }
};