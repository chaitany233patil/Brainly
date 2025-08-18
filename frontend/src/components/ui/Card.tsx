import { ReactElement, useEffect } from "react";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { motion } from "framer-motion";

interface cardProps {
  type: "Youtube" | "Twitter" | "Text" | "Other";
  title: string;
  link: string;
  id?: string;
  startIcon?: ReactElement;
  share?: boolean;
  index: number | string;
  onClick?: () => void;
  onDelete?: () => void;
}

export const Card = (props: cardProps) => {
  useEffect(() => {
    const loadTwitter = () => {
      // @ts-ignore
      if (window.twttr && window.twttr.widgets) {
        // @ts-ignore
        window.twttr.widgets.load();
      } else {
        setTimeout(loadTwitter, 300);
      }
    };
    loadTwitter();
  }, []);

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
    <motion.div
      variants={cardVariants as any}
      initial="hidden"
      animate="show"
      key={props.index}
    >
      <div
        key={props.index}
        className="max-w-80 min-w-68 border-1 border-gray-200 rounded-xl p-4 bg-white"
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
              <div onClick={props.onDelete}>
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
          <div className="overflow-hidden max-h-[250px] mb-4 min-w-30">
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

        {/* <div className="flex">
          <Tag title={"nvidia"} />
          <Tag title={"nvidia"} />
        </div> */}
      </div>
    </motion.div>
  );
};
