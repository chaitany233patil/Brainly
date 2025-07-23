import { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BrainIcon } from "../icons/Brain";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/Twitter";

export const ShareBrain = () => {
  const [content, setContent] = useState([]);
  const [owerner, setOwerner] = useState("");
  const { sharehash } = useParams();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URI}/brain/share/${sharehash}`)
      .then((res) => {
        setOwerner(res.data.username);
        setContent(res.data.content);
      });
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="max-w-[1100px] m-auto pt-6">
        <div className="text-2xl font-bold border-b-1 border-gray-300 pb-3 text-purple-600 flex pl-2">
          <BrainIcon />
          <div className="text-black ml-3">{owerner} second Brain</div>
        </div>
        <div className="pt-5 flex gap-4 flex-wrap pl-2">
          {content.length ? (
            content.map(
              ({ type, title, link }: any, index: string | number) => (
                <Card
                  type={type}
                  title={title}
                  link={link}
                  share={true}
                  startIcon={
                    type == "Youtube" ? (
                      <YoutubeIcon />
                    ) : (
                      <TwitterIcon width="18" />
                    )
                  }
                  index={index}
                />
              )
            )
          ) : (
            <div>Page Not Found</div>
          )}
        </div>
      </div>
      ;
    </div>
  );
};
