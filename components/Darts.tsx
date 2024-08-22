"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "@/helper/socketContext";
import { TUsers } from "@/helper/types";

export default function Darts({
  users,
  setUsers,
}: {
  users: TUsers[];
  setUsers: Dispatch<SetStateAction<TUsers[]>>;
}) {
  const [score, setScore] = useState<
    {
      thrower: string;
      score: number;
    }[]
  >([]);
  const [started, setStarted] = useState<boolean>(false);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("update", (data) => {
        console.log("Update erhalten:", data);
        setScore((prevScore) => [...prevScore, data]);
      });

      socket.on("whos-turn", (data) => {
        users[data.turn].turn = true;
        const newUsers = users.map((user) =>
          user.name === users[data.turn].name
            ? { ...user, turn: true }
            : { ...user, turn: false }
        );
        setUsers(newUsers);
        setStarted(true);
      });
      return () => {
        socket.off("update");
        socket.off("whos-turn");
      };
    }
  }, [socket, users]);

  const nextTurn = () => {
    const currIndex = users.findIndex((user) => user.turn);
    const newIndex = currIndex === -1 ? 0 : (currIndex + 1) % users.length;
    socket?.emit("whos-turn", { turn: newIndex });
  };

  const handleThrow = () => {
    if (socket) {
      const newScore = Math.floor(Math.random() * 180) + 1;
      socket.emit("dart-action", { thrower: "test", score: newScore });
      nextTurn();
    }
  };

  const startGame = () => {
    const whosTurn = Math.floor(Math.random() * users.length);
    socket?.emit("start-game", { turn: whosTurn });
    setStarted(true);
  };

  return (
    <div>
      <h1>Dein aktueller Score:</h1>
      {started ? (
        <button onClick={handleThrow}>Wurf machen</button>
      ) : (
        <button onClick={startGame}>Start Game</button>
      )}

      <div>
        {score.map((s, i) => {
          return (
            <div key={i}>
              {s.thrower}: {s.score}
            </div>
          );
        })}
      </div>
    </div>
  );
}
