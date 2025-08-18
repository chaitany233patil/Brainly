import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { CopyDone } from "../icons/CopyDone";
import { motion } from "framer-motion";
import { CloseIcon } from "../icons/CloseIcon";
import { Copy } from "lucide-react";

export const ShareLink = (props: {
  onClose: () => void;
  value: string;
  disbaledShare: () => void;
}) => {
  const [copy, setCopy] = useState(false);
  const [disabledShare, setDisabledShare] = useState("Disbaled Share");
  return (
    <>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
      <div
        className="absolute h-screen w-screen flex justify-center items-center z-10"
        onClick={props.onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-neutral-100 p-4 rounded-xl flex flex-col items-center min-w-90 sm:min-w-sm gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center w-full mb-2">
            <div className="font-medium text-xl flex-1 text-center">
              Share link
            </div>
            <div
              className="self-end hover:bg-neutral-400/30 p-2 rounded-lg cursor-pointer transition-all duration-300"
              onClick={props.onClose}
            >
              <CloseIcon size="size-6" />
            </div>
          </div>
          <div className="flex gap-2 px-2 items-center justify-center w-full">
            <Input
              disabled
              type="text"
              placeholder="loading.."
              value={props.value}
              className="w-full"
            />
            <div
              className="cursor-pointer"
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(
                  `${window.location.href}api/v1/brain/share/${props.value}`
                );
              }}
            >
              {copy ? <CopyDone /> : <Copy size={30} />}
            </div>
          </div>
          <Button
            varient="primary"
            size="md"
            text={disabledShare}
            fullsize="w-[95%]"
            onClick={() => {
              props.disbaledShare();
              setDisabledShare("disabaled");
            }}
          />
          <Button
            varient="primary"
            size="md"
            text="close"
            fullsize="w-[95%]"
            onClick={props.onClose}
          />
        </motion.div>
      </div>
    </>
  );
};
