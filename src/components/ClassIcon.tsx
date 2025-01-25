export const ClassIcon = ({
  selected = false,
  onClick,
  name,
}: {
  name: string;
  onClick: (name: string) => void;
  selected?: boolean;
}) => {
  return (
    <img
      className="place-self-center opacity-30 hover:scale-110 hover:cursor-pointer aria-selected:opacity-100"
      height={80}
      width={80}
      src={`/images/classes/${name}.png`}
      alt={`${name} class icon`}
      aria-selected={selected}
      onClick={() => onClick(name)}
    />
  );
};
