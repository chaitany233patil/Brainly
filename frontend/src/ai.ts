import { HfInference } from "@huggingface/inference";

let previusReply: string = "";

const SYSTEM_PROMPT = `
You are a helpful and concise AI assistant. Answer questions accurately but keep your responses short and to the point. Avoid unnecessary detail. When possible, use simple language. Limit replies to 2-3 sentences max unless absolutely necessary.
${previusReply} 
`;

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);

export default async function getBotResponse(userMessage: string) {
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 1024,
    });

    const result = response.choices[0].message;
    previusReply += result;
    // let currContent = "";
    // for (let i = 0; i < result.length; i++) {
    //   currContent += result[i];
    //   onUpdate(currContent);
    //   await new Promise((resolve) => setTimeout(resolve, 10));
    // }

    // generateBtn.innerText = "Generate New Recipe";
    // generateBtn.style.backgroundColor = "#d17557";
    // generateBtn.style.opacity = "1";
    // generateBtn.disabled = false;
    return result;
  } catch (err) {
    console.error(err.message);
  }
}
