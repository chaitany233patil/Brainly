import { useEffect, useRef, useState } from "react";
import getBotResponse from "../../ai";
import { motion } from "framer-motion";

export function BotChat() {
  const messageRef = useRef<HTMLInputElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [Messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [Messages]);

  async function getResponse() {
    if (!messageRef.current?.value.trim()) return;
    setLoading(true);

    const userMessage = messageRef.current.value;

    // Add user message
    //@ts-ignore
    setMessages((prev: { role: string; content: string }) => [
      //@ts-ignore
      ...prev,
      { role: "user", content: userMessage },
    ]);

    const botReply = await getBotResponse(userMessage);
    console.log(botReply);

    // Clear input
    messageRef.current.value = "";

    // Add assistant message
    //@ts-ignore
    setMessages((prev: { role: string; content: string }) => [
      //@ts-ignore
      ...prev,
      { role: "assistant", content: botReply },
    ]);

    setLoading(false);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        x: 200,
        y: 250,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="absolute md:bottom-15 md:right-20 bottom-25 right-10"
    >
      <div className="bg-[#e0e7ff] h-140 max-w-100 flex flex-col rounded-3xl p-3 justify-between">
        <div
          className="flex flex-col overflow-auto no-scrollbar"
          ref={scrollRef}
        >
          {Messages.map(
            (message: { content: string; role: string }, idx: number) => (
              <span
                key={idx}
                className={`bg-white p-3 rounded-2xl mb-2 ${
                  message.role === "assistant"
                    ? "self-start mr-15"
                    : "self-end ml-15"
                }`}
              >
                {message.content}
              </span>
            )
          )}
          {loading && (
            <span className="bg-white p-3 rounded-2xl mb-2 self-start mr-30">
              Responding...
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            ref={messageRef}
            className="flex-1 border-1 border-gray-200 rounded-2xl bg-amber-50 p-3"
            type="text"
            placeholder="Ask anything"
            onKeyDown={(e) =>
              e.key === "Enter" && messageRef.current?.value.trim() !== ""
                ? sendRef.current?.click()
                : null
            }
          />
          <button
            ref={sendRef}
            onClick={getResponse}
            className="p-2 border-2 rounded-2xl border-gray-200 bg-[#5046e4] text-xl text-white cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
