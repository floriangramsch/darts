export default function Pad({
  value,
  onClick,
}: {
  index: number | string;
  value: number | string;
  onClick: (value: number | string) => void;
}) {
  return (
    <div
      className="bg-gray-800 p-1 size-14 m-1 flex justify-center items-center"
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
}
