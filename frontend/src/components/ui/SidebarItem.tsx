import { ReactElement } from "react";

interface sideIconProps {
  icon: ReactElement;
  text: string;
}

export const SidebarItem = (props: sideIconProps) => {
  return (
    <div className="flex gap-3 items-center my-4 text-gray-700 mt-4 p-2 hover:bg-gray-200 rounded mr-4 cursor-pointer">
      {props.icon}
      <div className="md:block hidden">{props.text}</div>
    </div>
  );
};
