export default function Pad({
  value,
  onClick,
  className,
}: {
  index: number | string;
  value: number | string;
  onClick: (value: number | string) => void;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-800 p-1 size-14 m-1 flex justify-center items-center ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </div>
  );
}
