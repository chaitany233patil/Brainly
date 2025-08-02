import { useRef, useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { DropDown } from "../components/ui/DropDown";
import { CloseIcon } from "../icons/CloseIcon";
import { motion } from "framer-motion";

export const NewContentForm = (props: {
  onClose: () => void;
  onAdd: (newItem: any) => void;
}) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const typeRef = useRef<HTMLInputElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [type, setType] = useState("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function typeChange() {
    setType(typeRef.current?.value || "");
  }

  const validateForm = (): boolean => {
    if (type == "Youtube" || type == "Twitter") {
    }
    if (!titleRef.current!.value) {
      setError("Title is required");
      return false;
    } else if (type == "Youtube" || type == "Twitter") {
      if (!linkRef.current!.value) {
        setError("Link is required");
        return false;
      }
    } else if (type == "Text" || type == "Other") {
      if (!textAreaRef.current!.value) {
        setError("Description is required");
        return false;
      }
    }
    return true;
  };

  async function addContent() {
    if (!validateForm()) return;
    setError("");

    setIsLoading(true);
    try {
      let newLink = "";
      if ((type == "Youtube" || type == "Twitter") && linkRef.current?.value) {
        newLink = linkRef.current?.value
          .replace("youtu.", "youtu")
          .replace("e/", "e.com/watch?v=")
          .split("&")[0]
          .split("?si")[0]
          .split("?t=")[0];
      } else {
        newLink = textAreaRef.current!.value;
      }
      const data = {
        title: titleRef.current?.value,
        link: textAreaRef.current?.value || newLink,
        type: typeRef.current?.value,
      };
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/content`, data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      props.onAdd(data);
      setIsLoading(false);
      props.onClose();
    } catch (e) {
      alert("Please fill all information");
    }
  }

  return (
    <>
      <div className="h-screen w-screen absolute bg-gray-500 opacity-90 z-10"></div>
      <div
        className="absolute inset-0 flex justify-center items-center z-10"
        onClick={props.onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-4 rounded-2xl flex flex-col items-center min-w-90  sm:min-w-sm animate-[popUp]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="self-end cursor-pointer hover:bg-gray-500/40 p-2 rounded-sm"
            onClick={props.onClose}
          >
            <CloseIcon size={"size-6"} />
          </div>
          <div className="font-medium text-xl mb-3">Add New Content</div>
          <DropDown reference={typeRef} onChange={typeChange} />
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-2 bg-red-50 border border-red-200 text-red-700 w-full px-4 py-3 rounded-md text-sm"
            >
              {error}
            </motion.div>
          )}
          {type == "Youtube" || type == "Twitter" ? (
            <>
              <Input
                type="text"
                placeholder="Title"
                reference={titleRef}
                className="mb-2 "
              />
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
                className="mt-2 mb-2 p-3 w-full border-2 border-gray-300 rounded-lg"
              />
            </>
          ) : type == "Other" ? (
            <>
              <Input type="text" placeholder="Title" reference={titleRef} />
              <textarea
                //@ts-ignore
                ref={linkRef}
                placeholder="Description"
                cols={37}
                rows={9}
                className="mt-2 mb-2 p-2 w-full border-2 border-gray-300 rounded-lg"
              />
            </>
          ) : null}

          <Button
            varient="primary"
            size="lg"
            text={isLoading ? "Adding..." : "Add Content"}
            fullsize="w-full"
            onClick={addContent}
          />
        </motion.div>
      </div>
    </>
  );
};
