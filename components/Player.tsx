import { TThrow, TThrows, TUser } from "@/helper/types";

export default function Player({
  throws,
  user,
  firstScore,
}: {
  throws: TThrows;
  user: TUser;
  firstScore: number;
}) {
  // sum of last three throws of the player
  const sumThrows = () => {
    const res = throws.findLast(([name, _]) => name === user.name);
    if (res) {
      const throws = res[1];
      return throws?.reduce((prev, curr) => prev + curr, 0);
    }
  };

  // returns one of the last three throws
  const findLastThrow = (throwed: number) => {
    const res = throws.findLast(([name, _]) => name === user.name);
    if (res) {
      return res[1][throwed];
    }
  };

  // overall score
  const score = () => {
    const filteredThrows = throws.filter((t: TThrow) => t[0] === user.name);
    const userThrows = filteredThrows.map((t) => t[1]).flat();
    return userThrows.reduce((prev, curr) => prev - curr, firstScore);
  };

  return (
    <div className="flex relative justify-around bg-gray-900 my-1 py-1">
      <div
        className="absolute left-0 top-0 bottom-0 w-3 bg-green-500"
        hidden={!user.turn}
      ></div>
      <div>
        <div className="text-center">{score()}</div>
        <div className="text-base text-center">{user.name}</div>
      </div>
      <div>
        <div className="flex text-center">
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {findLastThrow(0)}
          </div>
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {findLastThrow(1)}
          </div>
          <div className="bg-black min-w-8 min-h-8 m-1 text-base flex justify-center items-center">
            {findLastThrow(2)}
          </div>
        </div>
        <div className="text-base text-center"></div>
        <div className="text-base text-center">{sumThrows()}</div>
      </div>
      <div>
        <div className="text-sm text-center">Sätze:0 Legs:0</div>
        <div className="text-sm text-center">I0</div>
        <div className="text-sm text-center">O0.00</div>
      </div>
    </div>
  );
}
