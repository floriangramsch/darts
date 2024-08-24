import { Dispatch, SetStateAction, useEffect } from "react";
import Pad from "./Pad";
import { useSocket } from "@/helper/socketContext";
import { TThrows } from "@/helper/types";

export default function NumberPad({
  setThrows,
  hidden,
  double,
  triple,
}: {
  setThrows: Dispatch<SetStateAction<TThrows>>;
  hidden: boolean;
  double: boolean;
  triple: boolean;
}) {
  const socket = useSocket();

  const handleThrow = (value: number | string) => {
    socket?.emit("throw", value);
  };

  return (
    socket &&
    hidden && (
      <div className="absolute bottom-0 flex flex-col w-full text-base bg-gray-900">
        <div className="grid grid-cols-7  justify-items-center">
          {Array.from({ length: 20 }).map((_, index) => (
            <Pad
              key={index}
              index={index}
              value={index + 1}
              onClick={handleThrow}
            />
          ))}
          {!triple && (
            <Pad key={25} index={25} value={25} onClick={handleThrow} />
          )}
        </div>
        <div className="flex w-full justify-around">
          <Pad key={0} index={0} value={0} onClick={handleThrow} />
          <Pad
            className={double ? "bg-red-300" : ""}
            key={"double"}
            index={"double"}
            value={"double"}
            onClick={handleThrow}
          />
          <Pad
            className={triple ? "bg-red-300" : ""}
            key={"triple"}
            index={"triple"}
            value={"triple"}
            onClick={handleThrow}
          />
          <Pad
            key={"backspace"}
            index={"backspace"}
            value={"<-"}
            onClick={handleThrow}
          />
        </div>
      </div>
    )
  );
}
