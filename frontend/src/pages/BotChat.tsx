import { useEffect, useRef, useState } from "react";
import getBotResponse from "../ai";
import { motion } from "framer-motion";

export function BotChat() {
  const messageRef = useRef<HTMLInputElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [Messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("Messages") as string) || [
      {
        role: "assistant",
        content: "Hello! How can I help you today?",
      },
    ]
  );

  // localStorage.setItem("Messages", JSON.stringify(Messages));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [Messages]);

  async function getResponse() {
    setLoading(true);
    //@ts-ignore
    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageRef.current?.value },
    ]);
    const res = await getBotResponse(messageRef.current?.value as string);
    console.log(res);
    (messageRef.current as HTMLInputElement).value = "";
    //@ts-ignore
    setMessages((prev) => [...prev, res]);
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
      className=" absolute bottom-18 right-20"
    >
      <div className="bg-[#e0e7ff] h-140 max-w-100 flex rounded-3xl p-3 flex flex-col justify-between">
        <div
          className="flex flex-col overflow-auto no-scrollbar"
          ref={scrollRef}
        >
          {Messages.map(
            (message: { content: string; role: string }, idx: number) => {
              return (
                <span
                  key={idx}
                  className={`bg-white p-3 rounded-2xl mb-2 ${
                    message.role == "assistant"
                      ? "self-start mr-15"
                      : "self-end ml-15"
                  }`}
                >
                  {message.content}
                </span>
              );
            }
          )}
          {loading && (
            <span className="bg-white p-3 rounded-2xl mb-2 self-start mr-30">
              Responding...
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <input
            ref={messageRef}
            className="flex-1 border-1 border-gray-200 rounded-2xl bg-amber-50 p-3"
            type="text"
            placeholder="Ask anything"
            onKeyDown={(e) =>
              e.key == "Enter" && messageRef.current?.value.trim() != ""
                ? sendRef.current?.click()
                : null
            }
          />
          <button
            ref={sendRef}
            onClick={getResponse}
            className="p-2 border-2 rounded-2xl border-gray-200 bg-[#5046e4] text-xl text-white cursor-pointer"
          >
            send
          </button>
        </div>
      </div>
    </motion.div>
  );
}
