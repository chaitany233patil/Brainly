import { ReactElement } from "react";

interface sideIconProps {
  icon: ReactElement;
  text: string;
  isActive: boolean;
}

export const SidebarItem = (props: sideIconProps) => {
  return (
    <div
      className={`flex gap-3 items-center my-4 text-gray-700 hover:text-black mt-4 p-2 hover:bg-gray-200 font-semibold ${
        props.isActive ? "bg-gray-300/70 text-black" : ""
      }  rounded mr-4 cursor-pointer`}
    >
      {props.icon}
      <div className="md:block hidden">{props.text}</div>
    </div>
  );
};
