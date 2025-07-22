import { ReactElement } from "react";
import { ShareIcon } from "../../icons/ShareIcon";
import { Tag } from "./Tag";
import { DeleteIcon } from "../../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface cardProps {
  type: "Youtube" | "Twitter" | "Text" | "Other";
  title: string;
  link: string;
  id?: string;
  startIcon?: ReactElement;
  share?: boolean;
  index: number | string;
}

export const Card = (props: cardProps) => {
  const navigate = useNavigate();

  async function deleteItem(id: string | undefined) {
    await axios.post(
      `${BACKEND_URL}/content/${id}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    navigate("/");
    window.location.reload();
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: typeof props.index === "number" ? props.index * 0.1 : 0, // stagger effect
      },
    },
  };

  return (
    //@ts-ignore
    <motion.div variants={cardVariants} initial="hidden" animate="show">
      <div
        key={props.index}
        className="max-w-80 min-w-80 border-1 border-gray-200 rounded-xl p-4 bg-white"
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="pr-2 text-gray-600 ">{props.startIcon}</div>
            <span className="font-medium">{props.title}</span>
          </div>
          <div className="flex items-center text-gray-600 gap-2">
            {props.type != "Other" && props.type != "Text" ? (
              <a href={props.link} target="_blank">
                <ShareIcon size={"md"} />
              </a>
            ) : null}
            {!props.share && (
              <div onClick={() => deleteItem(props.id)}>
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
        {props.type == "Youtube" && (
          <div key={props.index} className="w-full p-2 pt-5">
            <iframe
              className="w-full"
              src={props.link.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}
        {props.type == "Twitter" && (
          <div className="overflow-hidden max-h-[250px] mb-4">
            <blockquote className="twitter-tweet">
              <a href={props.link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          </div>
        )}
        {(props.type == "Other" || props.type == "Text") && (
          <div className="overflow-hidden max-h-[250px] mb-4">
            <div className="m-3">
              <p>{props.link}</p>
            </div>
          </div>
        )}
        {/* {props.type == "Other" && (
          <div key={props.index} className="w-full p-2 pt-5">
            <div></div>
          </div>
        )} */}

        <div className="flex">
          <Tag title={"nvidia"} />
          <Tag title={"nvidia"} />
        </div>
      </div>
    </motion.div>
  );
};
