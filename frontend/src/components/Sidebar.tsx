import { BrainIcon } from "../icons/Brain";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LogOutIcon } from "../icons/LogOut";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./ui/SidebarItem";

export const Sidebar = (props: { setFilter: (arg0: string) => void }) => {
  function changeFilter(filter: string) {
    localStorage.setItem("filter", filter);
    props.setFilter(filter);
  }
  return (
    <div className="w-60 h-screen fixed">
      <div className="text-2xl flex items-center p-2">
        <div className="text-purple-600 pl-3 pr-2 mt-3">
          <BrainIcon />
        </div>
        <div
          className="font-medium text-2xl ml-1 mt-2.5 cursor-pointer"
          onClick={() => changeFilter("all")}
        >
          Brainly
        </div>
      </div>
      <div className="p-2 ml-8 ">
        <div onClick={() => changeFilter("Twitter")}>
          <SidebarItem icon={<TwitterIcon width={"22"} />} text={"Tweets"} />
        </div>
        <div onClick={() => changeFilter("Youtube")}>
          <SidebarItem icon={<YoutubeIcon />} text={"Videos"} />
        </div>
        <div onClick={() => changeFilter("Other")}>
          <SidebarItem icon={<DocumentIcon />} text={"Document"} />
        </div>
      </div>
      <div
        className="absolute bottom-6 cursor-pointer text-gray-500 hover:text-gray-800 underline flex gap-2 ml-8 "
        onClick={() => {
          window.location.href = "http://localhost:5173";
          localStorage.removeItem("token");
        }}
      >
        <LogOutIcon />
        LogOut
      </div>
    </div>
  );
};
