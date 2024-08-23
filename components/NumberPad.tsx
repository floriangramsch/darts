import { Dispatch, SetStateAction, useEffect } from "react";
import Pad from "./Pad";
import { useSocket } from "@/helper/socketContext";
import { TThrows } from "@/helper/types";

export default function NumberPad({
  setThrows,
  hidden,
}: {
  setThrows: Dispatch<SetStateAction<TThrows>>;
  hidden: boolean;
}) {
  const socket = useSocket();

  // useEffect(() => {
  //   if (socket) {
  //     const handleEmit = (value: number | string) => {
  //       console.log("throw emit: ", value);
  //       handlePadClick(value);
  //     };
  //     socket.on("throwen", handleEmit);
  //     return () => {
  //       socket.off("throwen", handleEmit);
  //     };
  //   }
  // }, [socket]);

  const handleThrow = (value: number | string) => {
    socket?.emit("throw", value);
  };

  // const handlePadClick = (value: number | string) => {
  //   // const filteredThrows = throws.filter((t: TThrow) => t[0] === user.name);
  //   // const userThrows = filteredThrows.map((t) => t[1]).flat();
  //   // const score = userThrows.reduce((prev, curr) => prev - curr, 301);
  //   if (typeof value === "number") {
  //     setThrows((prevThrows) => {
  //       const newThrows = [...prevThrows];
  //       const updatedThrows = [...newThrows[newThrows.length - 1][1], value];
  //       newThrows[newThrows.length - 1] = [
  //         newThrows[newThrows.length - 1][0],
  //         updatedThrows,
  //       ];
  //       return newThrows;
  //     });
  //   } else if (value === "backspace") {
  //     // setThrows((prevThrows) => [prevThrows[0], prevThrows[1].slice(0, -1)]);
  //   } else if (value === "double" || value === "triple") {
  //     console.log(`${value} clicked`);
  //   }
  // };

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
          <Pad key={25} index={25} value={25} onClick={handleThrow} />
        </div>
        <div className="flex w-full justify-around">
          <Pad key={0} index={0} value={0} onClick={handleThrow} />
          <Pad
            key={"double"}
            index={"double"}
            value={"double"}
            onClick={handleThrow}
          />
          <Pad
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
