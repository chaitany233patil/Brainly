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
  type?: "submit" | "button" | "reset";
  loading?: boolean; // ✅ New loading prop
  loadingText?: string; // ✅ Optional loading text
}

// ✅ Spinner Component
const Spinner = ({ size = "sm" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} text-current`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const varientType = {
  primary:
    "bg-[#5046e4] text-white hover:bg-[#6259f0] inset-shadow-sm inset-shadow-[#190be6]-500 ring-1",
  secondary:
    "bg-[#e0e7ff] text-purple-600 inset-shadow-sm inset-shadow-indigo-500/50 ring-1",
};

const defaultStyle = `rounded-md flex items-center font-medium cursor-pointer justify-center transition-all duration-150 relative`;

const sizeStyle = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};

export const Button = (props: buttonProps) => {
  // ✅ Calculate if button should be disabled (disabled prop OR loading)
  const isDisabled = props.disabled || props.loading;

  // ✅ Determine what text to show
  const displayText =
    props.loading && props.loadingText ? props.loadingText : props.text;

  // ✅ Determine what icon to show
  const getStartIcon = () => {
    if (props.loading) {
      return <Spinner size={props.size} />;
    }
    return props.startIcon;
  };

  return (
    <button
      type={props.type || "button"}
      disabled={isDisabled}
      className={`
        ${varientType[props.varient]} 
        ${defaultStyle} 
        ${sizeStyle[props.size]} 
        ${props.fullsize || ""} 
        ${
          isDisabled
            ? "cursor-not-allowed opacity-60"
            : "hover:scale-[1.02] active:scale-[0.98]"
        } 
        ${props.className || ""}
      `
        .trim()
        .replace(/\s+/g, " ")}
      onClick={isDisabled ? undefined : props.onClick}
    >
      {/* ✅ Start Icon or Spinner */}
      {getStartIcon() && (
        <div className="mr-2 flex items-center">{getStartIcon()}</div>
      )}

      {/* ✅ Button Text */}
      <span className={props.loading ? "opacity-80" : "opacity-100"}>
        {displayText}
      </span>

      {/* ✅ End Icon (hidden when loading) */}
      {props.endIcon && !props.loading && (
        <div className="ml-2 flex items-center">{props.endIcon}</div>
      )}
    </button>
  );
};
