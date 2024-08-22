import { TUser } from "@/helper/types";
import { useEffect } from "react";

export default function Player({
  throws,
  user,
}: {
  throws: number[];
  user: TUser;
}) {
  const sumThrows = () => {
    return throws.reduce((prev, curr) => prev + curr, 0);
  };

  useEffect(() => {
    console.log("test");
  }, [throws]);
  return (
    <div className="flex relative justify-around bg-gray-900 my-1 py-1">
      <div
        className="absolute left-0 top-0 bottom-0 w-3 bg-green-500"
        hidden={!user.turn}
      ></div>
      <div>
        <div className="text-center">301</div>
        <div className="text-base text-center">{user.name}</div>
      </div>
      <div>
        <div className="flex text-center">
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {throws[0]}
          </div>
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {throws[1]}
          </div>
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {throws[2]}
          </div>
        </div>
        <div className="text-base text-center"></div>
        <div className="text-base text-center">{sumThrows()}</div>
      </div>
      <div>
        <div className="text-sm text-center">Sätzen:0 Legs:0</div>
        <div className="text-sm text-center">I0</div>
        <div className="text-sm text-center">O0.00</div>
      </div>
    </div>
  );
}
