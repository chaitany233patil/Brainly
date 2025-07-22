import { BrainIcon } from "../icons/Brain";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LogOutIcon } from "../icons/LogOut";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./ui/SidebarItem";
import { useNavigate } from "react-router-dom";

export const Sidebar = (props: { setFilter: (arg0: string) => void }) => {
  function changeFilter(filter: string) {
    localStorage.setItem("filter", filter);
    props.setFilter(filter);
  }
  const navigate = useNavigate();
  return (
    <div className="h-screen fixed md:w-60 ">
      <div className="text-2xl flex items-center p-2">
        <div
          className="text-purple-600 md:pl-3 pr-2 mt-3"
          onClick={() => changeFilter("all")}
        >
          <BrainIcon />
        </div>
        <div
          className="font-medium text-2xl ml-1 mt-2.5 cursor-pointer md:block hidden"
          onClick={() => changeFilter("all")}
        >
          Brainly
        </div>
      </div>
      <div className="p-2 md:ml-8 ">
        <div onClick={() => changeFilter("Twitter")}>
          <SidebarItem
            icon={<TwitterIcon width={"22"} />}
            text={"Tweets"}
            isActive={"Twitter" == localStorage.getItem("filter")}
          />
        </div>
        <div onClick={() => changeFilter("Youtube")}>
          <SidebarItem
            icon={<YoutubeIcon />}
            text={"Videos"}
            isActive={"Youtube" == localStorage.getItem("filter")}
          />
        </div>
        <div onClick={() => changeFilter("Text")}>
          <SidebarItem
            icon={<DocumentIcon />}
            text={"Document"}
            isActive={"Text" == localStorage.getItem("filter")}
          />
        </div>
      </div>
      <div
        className="absolute flex flex-row bottom-6 cursor-pointer text-gray-500 hover:text-gray-800 underline gap-2 items-center md:ml-8 ml-5"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
      >
        <LogOutIcon />
        <span className="md:block hidden">LogOut</span>
      </div>
    </div>
  );
};
