import { useState } from "react";
import { BotButtonIcon } from "./BotButtonIcon";
import { BotButtonCloseIcon } from "./BotClose";

interface BotIconType {
  onClick: () => void;
}

export function BotIcon(props: BotIconType) {
  const [close, setClose] = useState(false);
  return (
    <div
      onClick={() => {
        props.onClick();
        setClose((prev) => !prev);
      }}
      className="bg-gradient-to-r from-[#8956f3] via-purple-600 to-[#9010c6] text-white absolute  bottom-8 right-10 text-white p-3 text-xl font-bold 
      rounded-tl-4xl rounded-bl-4xl rounded-tr-4xl cursor-pointer inset-shadow-sm inset-shadow-[#7f7ac2]-200"
    >
      {close ? <BotButtonCloseIcon /> : <BotButtonIcon />}
    </div>
  );
}
