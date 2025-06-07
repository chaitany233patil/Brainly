import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

const SYSTEM_PROMPT = `
You are a helpful and concise AI assistant. 
Answer questions accurately but keep your responses short and to the point. 
Avoid unnecessary detail. Use simple language when possible.
`;

export default async function getBotResponse(userMessage: string) {
  try {
    const prompt = `
${SYSTEM_PROMPT}
User: ${userMessage}
AI:
    `.trim();

    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
        stop: ["User:", "AI:"],
      },
    });

    const result =
      response.generated_text
        .split("AI:")
        .pop()
        ?.trim() || "Sorry, I couldn't understand that.";

    return result;
  } catch (err) {
    console.error(err);
    return "Sorry, I could not get a response.";
  }
}
