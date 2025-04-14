import { useState } from "react";
import { BotButtonIcon } from "../icons/BotButtonIcon";
import { BotButtonCloseIcon } from "../icons/BotClose";

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
      className="bg-[#332c93] absolute  bottom-10 right-10 text-white p-3 text-2xl font-bold 
      rounded-tl-4xl rounded-bl-4xl rounded-tr-4xl cursor-pointer inset-shadow-sm inset-shadow-[#7f7ac2]-200"
    >
      {close ? <BotButtonCloseIcon /> : <BotButtonIcon />}
    </div>
  );
}
