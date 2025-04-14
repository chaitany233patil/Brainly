import { useContext, useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DropDown } from "../components/ui/DropDown";
import { CloseIcon } from "../icons/CloseIcon";
import { motion } from "framer-motion";

export const NewContentForm = (props: { onClose: () => void }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [type, setType] = useState("");

  function typeChange() {
    setType(typeRef.current?.value || "");
    console.log(textAreaRef.current?.value);
  }

  async function addContent() {
    try {
      await axios.post(
        `${BACKEND_URL}/content`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value || textAreaRef.current?.value,
          type: typeRef.current?.value,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      window.location.href = "http://localhost:5173";
      props.onClose();
    } catch (e) {
      alert("Please fill all information");
    }
  }

  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-600 opacity-90"></div>
      <div
        className="absolute h-screen w-screen flex justify-center items-center"
        onClick={props.onClose}
      >
        0
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-4 rounded-2xl flex flex-col items-center min-w-90 animate-[popUp]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="self-end cursor-pointer" onClick={props.onClose}>
            <CloseIcon size={"size-7"} />
          </div>
          <div className="font-medium text-xl mb-3">Add New Content</div>
          <DropDown reference={typeRef} onChange={typeChange} />
          {type == "Youtube" || type == "Twitter" ? (
            <>
              <Input type="text" placeholder="Title" reference={titleRef} />
              <Input type="text" placeholder="link" reference={linkRef} />
            </>
          ) : type == "Text" ? (
            <>
              <Input type="text" placeholder="Title" reference={titleRef} />
              <textarea
                ref={textAreaRef}
                placeholder="Description"
                cols={37}
                rows={9}
                className="p-3 border-2 border-gray-300 rounded-lg"
              />
            </>
          ) : type == "Other" ? (
            <>
              <Input type="text" placeholder="Title" reference={titleRef} />
              <textarea
                ref={textAreaRef}
                placeholder="Description"
                cols={37}
                rows={9}
                className="p-3 border-2 border-gray-300 rounded-lg"
              />
            </>
          ) : null}

          <Button
            varient="primary"
            size="md"
            text="Add Content"
            fullsize="w-[95%]"
            onClick={addContent}
          />
        </motion.div>
      </div>
    </>
  );
};
