import { Ref, ChangeEventHandler } from "react";
import React from "react";

interface DropDownProps {
  reference?: React.RefObject<HTMLInputElement>;
}

export const DropDown = (props: {
  reference: React.Ref<HTMLSelectElement | null>;
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}) => {
  return (
    <>
      <select
        ref={props.reference}
        onChange={props.onChange}
        className="w-[95%] items-center h-10 border-1 border-gray-300 rounded-lg p-2 pr-2 my-3 cursor-pointer"
      >
        <option>Choose one type</option>
        <option>Text</option>
        <option>Youtube</option>
        <option>Twitter</option>
        <option>Other</option>
      </select>
    </>
  );
};
