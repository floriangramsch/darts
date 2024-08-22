import { Dispatch, SetStateAction } from "react";
import Pad from "./Pad";

export default function NumberPad({
  setThrows,
}: {
  setThrows: Dispatch<SetStateAction<number[]>>;
}) {
  const handlePadClick = (value: number | string) => {
    console.log(value);
    if (typeof value === "number") {
      setThrows((prevThrows) => [...prevThrows, value]);
    } else if (value === "backspace") {
      setThrows((prevThrows) => prevThrows.slice(0, -1));
    } else if (value === "double" || value === "triple") {
      console.log(`${value} clicked`);
    }
  };

  return (
    <div className="absolute bottom-0 flex flex-col w-full text-base bg-gray-900">
      <div className="grid grid-cols-7  justify-items-center">
        {Array.from({ length: 20 }).map((_, index) => (
          <Pad
            key={index}
            index={index}
            value={index + 1}
            onClick={handlePadClick}
          />
        ))}
        <Pad key={25} index={25} value={25} onClick={handlePadClick} />
      </div>
      <div className="flex w-full justify-around">
        <Pad key={0} index={0} value={0} onClick={handlePadClick} />
        <Pad
          key={"double"}
          index={"double"}
          value={"double"}
          onClick={handlePadClick}
        />
        <Pad
          key={"triple"}
          index={"triple"}
          value={"triple"}
          onClick={handlePadClick}
        />
        <Pad
          key={"backspace"}
          index={"backspace"}
          value={"<-"}
          onClick={handlePadClick}
        />
      </div>
    </div>
  );
}
