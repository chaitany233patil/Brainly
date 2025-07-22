import { ReactElement } from "react";

export interface buttonProps {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullsize?: string;
  disabled?: boolean;
  className?: string;
  type?: "submit";
}

const varientType = {
  primary:
    "bg-[#5046e4] text-white hover:bg-[#6259f0] inset-shadow-sm inset-shadow-[#190be6]-500 ring-1",
  secondary:
    "bg-[#e0e7ff] text-purple-600 inset-shadow-sm inset-shadow-indigo-500/50 ring-1",
};

const defaultStyle = `rounded-md m-2 flex items-center font-medium cursor-pointer justify-center transition-all duration-150`;

const sizeStyle = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

export const Button = (props: buttonProps) => {
  return (
    <button
      type={props.type}
      className={`${varientType[props.varient]} ${defaultStyle} ${
        sizeStyle[props.size]
      } ${props.fullsize} ${props.disabled ? "cursor-not-allowed" : ""} ${
        props.className
      }`}
      onClick={props.onClick}
    >
      {props.startIcon ? <div className="mr-1">{props.startIcon}</div> : null}
      <span>{props.text}</span>
    </button>
  );
};
