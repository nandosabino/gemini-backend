import { GoogleGenAI } from "@google/genai";
import { json } from "express";

const ai = new GoogleGenAI({});

const chatSessions = {};

const systemInstruction = `Você é um Chef de cozinha e gerador de receitas. Sua ÚNICA E EXCLUSIVA FUNÇÃO é retornar a receita no formato JSON. A resposta DEVE ser um objeto JSON VÁLIDO. Todo o TEXTO (titulo, ingredientes, passos) DEVE estar em PORTUGUÊS DO BRASIL. Use as chaves EXATAS: "titulo" (string), "ingredientes" (array de strings) e "modoPreparo" (array de strings).`;

function getOrCreateChat(sessionId) {
  if (!chatSessions[sessionId]) {
    const newChat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });
    chatSessions[sessionId] = newChat;
    console.log(`Nova sessão de chat criada: ${sessionId}`);
  }
  return chatSessions[sessionId];
}

/**
  @param {string} text
  @returns {object}
 */
function extractJson(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (jsonMatch && jsonMatch[0]) {
    try {
      // Tenta fazer o parse da string encontrada
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("ERRO: JSON extraído é inválido.", e);
      throw new Error("JSON extraído da IA está malformado.");
    }
  }
  throw new Error("A IA não retornou um objeto JSON válido.");
}

export async function sendStructuredRecipe(sessionId, userMessage) {
  try {
    const chat = getOrCreateChat(sessionId);

    const response = await chat.sendMessage({
      message: userMessage,
    });

    const fullText = response.text.trim();

    const recipeObject = extractJson(fullText);

    return recipeObject;
  } catch (error) {
    console.error(
      "ERRO [Gemini JSON Service]: Falha na comunicação ou extração:",
      error.message
    );
    throw new Error(`Falha ao processar a receita: ${error.message}`);
  }
}
