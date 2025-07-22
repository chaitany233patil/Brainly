import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { CopyIcon } from "../icons/CopyIcon";
import { CopyDone } from "../icons/CopyDone";
import { motion } from "framer-motion";

export const ShareLink = (props: {
  onClose: () => void;
  value: string;
  disbaledShare: () => void;
}) => {
  const [copy, setCopy] = useState(false);
  const [disabledShare, setDisabledShare] = useState("Disbaled Share");
  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-600 opacity-90 z-10"></div>
      <div
        className="absolute h-screen w-screen flex justify-center items-center z-10"
        onClick={props.onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-4 rounded-2xl flex flex-col items-center min-w-[25px] sm:min-w-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-medium text-xl mb-3">Share link</div>
          <div className="flex items-center justify-center">
            <Input
              disabled
              type="text"
              placeholder="Username"
              value={props.value}
              className="w-full"
            />
            <div
              className="cursor-pointer"
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(
                  `${window.location.href}/api/v1/brain/share/${props.value}`
                );
              }}
            >
              {copy ? <CopyDone /> : <CopyIcon size={"size-8"} />}
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
