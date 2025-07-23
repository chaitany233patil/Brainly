import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { NewContentForm } from "./NewContent";
import { useState } from "react";
import { useContent } from "../hooks/useContent";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/Twitter";
import { ShareLink } from "./Sharelink";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { BotIcon } from "../components/bot";
import { BotChat } from "./BotChat";

function Dashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shareLinkOpen, setShareLinkOpen] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");
  const [talk, setTalk] = useState(false);

  const { content, setContent } = useContent();

  if (
    localStorage.getItem("token") == "undefined" ||
    localStorage.getItem("token") == null
  ) {
    return <Navigate to={"/signup"} />;
  }

  async function deleteItem(id: string | undefined) {
    setContent((prev) =>
      prev.filter((item: { _id: string }) => item._id !== id)
    );
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/content/${id}`,
      {},
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }

  async function getBrainLink(isShare: boolean) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/brain/share`,
      { isShare: isShare },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    setShareLink(`${response.data.hash}`);
  }

  let filteredContent =
    filter === "all" ? content : content.filter(({ type }) => type === filter);

  const filterContent = filteredContent.map(({ link, title, type, _id }) => (
    <Card
      onClick={() => deleteItem(_id)}
      key={_id}
      index={_id}
      id={_id}
      title={title}
      type={type}
      link={link}
      startIcon={
        type === "Youtube" ? <YoutubeIcon /> : <TwitterIcon width="18" />
      }
    />
  ));

  return (
    <>
      {shareLinkOpen && (
        <ShareLink
          onClose={() => setShareLinkOpen(false)}
          value={shareLink}
          disbaledShare={() => getBrainLink(false)}
        />
      )}
      {isOpen && (
        <NewContentForm
          onClose={() => setIsOpen(false)}
          //@ts-ignore
          onAdd={(newItem) => setContent((prev) => [newItem, ...prev])}
        />
      )}
      <div className="w-screen h-screen flex">
        <Sidebar setFilter={setFilter} />
        <div className="md:ml-60 ml-14 bg-gray-100 pl-4 min-h-screen overflow-y-auto w-full">
          <div className="w-full justify-between items-center my-3 mb-5 flex">
            <div className="text-xl font-medium ml-2">Welcome, 👋</div>
            <div className="flex mr-6">
              <Button
                varient="secondary"
                text={window.innerWidth >= 640 ? "Share Brain" : ""}
                size={"sm"}
                startIcon={<ShareIcon size={"md"} />}
                onClick={() => {
                  setShareLinkOpen(true);
                  getBrainLink(true);
                }}
              />
              <span>
                <Button
                  varient="primary"
                  text={window.innerWidth >= 640 ? "Add Content" : ""}
                  size={"sm"}
                  startIcon={<PlusIcon size={"lg"} />}
                  onClick={() => setIsOpen(true)}
                />
              </span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">{filterContent}</div>
          {talk && <BotChat />}
          <BotIcon onClick={() => setTalk((prev) => !prev)} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
