import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { CopyIcon } from "../icons/CopyIcon";
import { CopyDone } from "../icons/CopyDone";

export const ShareLink = (props: {
  onClose: () => void;
  value: string;
  disbaledShare: () => void;
}) => {
  const [copy, setCopy] = useState(false);
  const [disabledShare, setDisabledShare] = useState("Disbaled Share");
  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-600 opacity-90"></div>
      <div
        className="absolute h-screen w-screen flex justify-center items-center"
        onClick={props.onClose}
      >
        <div
          className="bg-white p-4 rounded-2xl flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-medium text-xl mb-3">Share link</div>
          <div className="flex items-center">
            <Input type="text" placeholder="Username" value={props.value} />
            <div
              className="cursor-pointer"
              onClick={() => {
                setCopy(true);
                navigator.clipboard.writeText(
                  `http://localhost:5173/api/v1/brain/share/${props.value}`
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
        </div>
      </div>
    </>
  );
};
