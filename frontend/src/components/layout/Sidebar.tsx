import { BrainIcon } from "../icons/Brain";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LogOutIcon } from "../icons/LogOut";
import { TwitterIcon } from "../icons/Twitter";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "../UI/SidebarItem";
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
          className="font-bold text-2xl mt-2.5 cursor-pointer md:block hidden bg-clip-text bg-gradient-to-r text-transparent from-[#8956f3] via-purple-600 to-[#9010c6]"
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
        className="absolute bottom-10 left-0 right-0 gap-2 flex items-center justify-center"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
      >
        <div className=" group flex gap-1 cursor-pointer hover:border-2  hover:rounded-xl py-3 px-6 text-gray-500 hover:text-red-500 transition-all duration-300">
          <LogOutIcon />
          <span className="md:block hidden">LogOut</span>
        </div>
      </div>
    </div>
  );
};
