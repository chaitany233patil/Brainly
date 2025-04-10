interface TagProps {
  title: string;
}

export const Tag = (props: TagProps) => {
  return (
    <span className="bg-[#dbe3fa] text-purple-600 rounded-xl px-2 py-1 ml-2 mt-2 text-sm">
      #{props.title}
    </span>
  );
};
