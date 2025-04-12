import { useRef, useState } from "react";
import getBotResponse from "../ai";

export function BotChat() {
  const messageRef = useRef<HTMLInputElement>(null);
  const [Messages, setMessages] = useState([
    {
      role: "assistant",
      content: "How can i help you today",
    },
  ]);
  async function getResponse() {
    //@ts-ignore
    setMessages((prev) => [
      ...prev,
      { role: "user", content: messageRef.current?.value },
    ]);
    const res = await getBotResponse(messageRef.current?.value as string);
    //@ts-ignore
    setMessages((prev) => [...prev, res]);
  }
  return (
    <div className=" absolute bottom-20 right-30">
      <div className="bg-[#e0e7ff] h-140 w-160 rounded-3xl p-3 flex flex-col justify-between">
        <div className="flex flex-col overflow-auto">
          {Messages.map((message) => {
            return (
              <span
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
        </div>
        <div className="flex gap-2">
          <input
            ref={messageRef}
            className="flex-1 border-1 border-gray-200 rounded-2xl bg-amber-50 p-3"
            type="text"
            placeholder="hello"
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
