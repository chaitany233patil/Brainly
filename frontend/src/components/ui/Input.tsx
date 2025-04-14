interface InputProps {
  placeholder: string;
  type: string;
  required?: boolean;
  reference?: React.RefObject<HTMLInputElement>;
  value?: string;
}

export const Input = (props: InputProps) => {
  return (
    <>
      {props.value ? (
        <input
          ref={props.reference}
          className="border-2 border-gray-300 p-2 w-72 rounded-lg m-2"
          type={props.type}
          placeholder={props.placeholder}
          value={`http://localhost:5173/api/v1/brain/share/${props.value}`}
        />
      ) : (
        <input
          ref={props.reference}
          className="border-2 border-gray-300 p-2 w-80 rounded-lg m-2"
          type={props.type}
          placeholder={props.placeholder}
        />
      )}
    </>
  );
};
