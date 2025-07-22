const SYSTEM_PROMPT = `
You are a helpful and concise AI assistant. 
Answer questions accurately but keep your responses short and to the point. 
Avoid unnecessary detail. Use simple language when possible.
`.trim();

export default async function getBotResponse(userMessage: string) {
  try {
    const HF_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN;

    const prompt = `${SYSTEM_PROMPT}\nUser: ${userMessage}\nAI:`;

    const res = await fetch(
      "https://api-inference.huggingface.co/models/mistral-community/Mistral-7B-v0.1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            stop: ["User:", "AI:"],
          },
        }),
      }
    );

    const data = await res.json();

    const result =
      data.generated_text?.split("AI:").pop()?.trim() ||
      "Sorry, I couldn't understand that.";

    return result;
  } catch (error) {
    console.error("Hugging Face fetch error:", error);
    return "Sorry, I could not get a response.";
  }
}
