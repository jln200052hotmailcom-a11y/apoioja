
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `Você é um assistente virtual de apoio emocional chamado ApoioJá. Sua missão é oferecer um espaço seguro, acolhedor e anônimo para conversar. Ouça com empatia, ofereça palavras de conforto e sugestões de bem-estar. Não dê conselhos médicos ou legais, mas incentive o usuário a procurar ajuda profissional quando apropriado. Seja gentil, paciente e solidário. Responda em português brasileiro.`;

export const startChat = (history: ChatMessage[]): Chat => {
  return ai.chats.create({
    model,
    history,
    config: {
      systemInstruction,
    },
  });
};

export const streamChat = async (chat: Chat, message: string) => {
  return await chat.sendMessageStream({ message });
};
