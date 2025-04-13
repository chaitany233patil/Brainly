import { useEffect, useRef, useState } from "react";
import getBotResponse from "../ai";

export function BotChat() {
  const messageRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [Messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);

  useEffect(() => {
    console.log("hii");
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
    (messageRef.current as HTMLInputElement).value = "";
    //@ts-ignore
    setMessages((prev) => [...prev, res]);
    setLoading(false);
  }
  return (
    <div className=" absolute bottom-20 right-30">
      <div className="bg-[#e0e7ff] h-140 w-120 rounded-3xl p-3 flex flex-col justify-between">
        <div
          className="flex flex-col overflow-auto no-scrollbar"
          ref={scrollRef}
        >
          {Messages.map((message, idx) => {
            return (
              <span
                key={idx}
                className={`bg-white p-3 rounded-2xl mb-2 ${
                  message.role == "assistant"
                    ? "self-start mr-30"
                    : "self-end ml-30"
                }`}
              >
                {message.content}
              </span>
            );
          })}
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
          />
          <button
            onClick={getResponse}
            className="p-2 border-2 rounded-2xl border-gray-200 bg-[#5046e4] text-xl text-white cursor-pointer"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}
