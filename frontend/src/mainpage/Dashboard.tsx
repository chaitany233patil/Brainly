import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// UI
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

//layout
import { Sidebar } from "../components/layout/Sidebar";

// Icons
import { ShareIcon } from "../components/icons/ShareIcon";
import { PlusIcon } from "../components/icons/PlusIcon";
import { YoutubeIcon } from "../components/icons/YoutubeIcon";
import { TwitterIcon } from "../components/icons/Twitter";
import { DocumentIcon } from "../components/icons/DocumentIcon";
import { BotIcon } from "../components/icons/bot";

//Pop Models
import { ShareLink } from "../components/models/ShareModel";
import { NewContentForm } from "../components/models/NewContent";
import { BotChat } from "../components/models/BotChat";

//curtom hook
import { useContent } from "../hooks/useContent";
import { DeleteModel } from "../components/models/DeleteModel";

export function Dashboard() {
  const { isLoading, content, setContent } = useContent();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shareLinkOpen, setShareLinkOpen] = useState<boolean>(false);
  const [shareLink, setShareLink] = useState<string>("");
  const [filter, setFilter] = useState<string>(
    localStorage.getItem("filter") || "all"
  );
  const [opentBot, setOpenBot] = useState(false);
  const [deleteModel, setDeleteModel] = useState({ model: false, id: null });
  const navigate = useNavigate();

  if (
    localStorage.getItem("token") == "undefined" ||
    localStorage.getItem("token") == null
  ) {
    return navigate("/singin");
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

  async function getSharableLink(isShare: boolean) {
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
      onDelete={() => setDeleteModel(() => ({ model: true, id: _id }))}
      startIcon={
        type === "Youtube" ? (
          <YoutubeIcon />
        ) : type == "Twitter" ? (
          <TwitterIcon width="18" />
        ) : (
          <DocumentIcon />
        )
      }
    />
  ));

  return (
    <>
      {shareLinkOpen && (
        <ShareLink
          onClose={() => setShareLinkOpen(false)}
          value={shareLink}
          disbaledShare={() => getSharableLink(false)}
        />
      )}
      {isOpen && (
        <NewContentForm
          onClose={() => setIsOpen(false)}
          //@ts-ignore
          onAdd={(newItem) => setContent((prev) => [newItem, ...prev])}
        />
      )}
      <div className="relative w-screen h-screen flex">
        <Sidebar setFilter={setFilter} />
        <div className="md:ml-60 ml-14 bg-gray-100 pl-4 min-h-screen overflow-y-auto w-full">
          <div className="w-full justify-between items-center my-3 mb-5 flex">
            <div className="flex flex-col pl-2">
              <div className="text-2xl font-bold">Welcome, 👋</div>
              <div className="text-neutral-500 text-sm">
                Your beautiful brain collection
              </div>
            </div>
            <div className="flex mr-6 gap-2">
              <Button
                varient="secondary"
                text={window.innerWidth >= 640 ? "Share Brain" : ""}
                size={"sm"}
                startIcon={<ShareIcon size={"md"} />}
                onClick={() => {
                  setShareLinkOpen(true);
                  getSharableLink(true);
                }}
              />
              <span>
                <Button
                  varient="special"
                  text={window.innerWidth >= 640 ? "Add Content" : ""}
                  size={"sm"}
                  startIcon={<PlusIcon size={"lg"} />}
                  onClick={() => setIsOpen(true)}
                />
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className="text-center text-sm sm:text-md text-neutral-500 mt-20">
              Loading...
            </div>
          ) : (
            <div className="flex gap-4 flex-wrap">
              {filterContent.length > 0 ? (
                filterContent
              ) : (
                <div className="max-w-sm mx-auto bg-yellow-200 bg-opacity-70 backdrop-blur-md rounded-lg p-4">
                  <p className="text-sm leading-4 text-center">
                    <b>Note:</b> Our app is hosted on a free server. The first
                    request may take 50–60 seconds to load, but it will be fast
                    after that.
                    <br />
                    <br />
                    Loading...
                  </p>
                </div>
              )}
            </div>
          )}
          {opentBot && <BotChat />}
          <BotIcon onClick={() => setOpenBot((prev) => !prev)} />
        </div>

        {/* Delete Model */}
        {deleteModel.model && (
          <DeleteModel
            onDelete={() => {
              deleteItem(deleteModel.id!);
              setDeleteModel((prev) => ({ ...prev, model: false }));
            }}
            onCancel={() =>
              setDeleteModel((prev) => ({ ...prev, model: false }))
            }
          />
        )}
      </div>
    </>
  );
}
