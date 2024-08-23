"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSocket } from "@/helper/socketContext";
import { TThrow, TThrows, TUser, TUsers } from "@/helper/types";
import Overview from "./Overview";
import NumberPad from "./NumberPad";

export default function Darts({
  user,
  users,
  setUser,
  setUsers,
}: {
  user: TUser;
  users: TUsers;
  setUser: Dispatch<SetStateAction<TUser>>;
  setUsers: Dispatch<SetStateAction<TUsers>>;
}) {
  const [started, setStarted] = useState<boolean>(false);
  const [throws, setThrows] = useState<TThrows>([]);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("whos-turn", (data: { turn: number }) => {
        users[data.turn].turn = true;
        const newUsers = users.map((user: TUser) =>
          user.name === users[data.turn].name
            ? { ...user, turn: true }
            : { ...user, turn: false }
        );
        setUser((prevUser) => ({
          ...prevUser,
          turn: user.name === users[data.turn].name ? true : false,
        }));
        setUsers(newUsers);
        setStarted(true);
        setThrows((prevThrows) => [
          ...prevThrows,
          [users[data.turn].name ?? "", []],
        ]);
      });
      const handleEmit = (value: number | string) => {
        console.log("throw emit: ", value);
        handlePadClick(value);
      };
      socket.on("throwen", handleEmit);
      return () => {
        socket.off("update");
        socket.off("whos-turn");
        socket.off("throwen", handleEmit);
      };
    }
  }, [socket, users]);

  useEffect(() => {
    if (throws[throws.length - 1]) {
      const lastThrow = throws[throws.length - 1];
      if (lastThrow[1].length >= 3) {
        // do zeug
        nextTurn();
      }
    }
  }, [throws]);

  const scoreBefore = (thrower: string) => {
    const filteredThrows = throws.filter((t: TThrow) => t[0] === thrower);
    const userThrows = filteredThrows.map((t) => t[1]).flat();
    return userThrows.reduce((prev, curr) => prev - curr, 301);
  };

  const handlePadClick = (value: number | string) => {
    if (typeof value === "number") {
      setThrows((prevThrows) => {
        // const thrower = prevThrows[prevThrows.length - 1][0]
        // const score = scoreBefore(thrower);
        // if (score - value < 0) {
        // }
        const newThrows = [...prevThrows];
        const updatedThrows = [...newThrows[newThrows.length - 1][1], value];
        newThrows[newThrows.length - 1] = [
          newThrows[newThrows.length - 1][0],
          updatedThrows,
        ];
        return newThrows;
      });
    } else if (value === "backspace") {
      // setThrows((prevThrows) => [prevThrows[0], prevThrows[1].slice(0, -1)]);
    } else if (value === "double" || value === "triple") {
      console.log(`${value} clicked`);
    }
  };

  const nextTurn = () => {
    const currIndex = users.findIndex((user) => user.turn);
    const newIndex = currIndex === -1 ? 0 : (currIndex + 1) % users.length;
    socket?.emit("whos-turn", { turn: newIndex });
  };

  const startGame = () => {
    const whosTurn = Math.floor(Math.random() * users.length);
    socket?.emit("start-game", { turn: whosTurn });
    // setStarted(true);
  };

  return (
    <div>
      <Overview
        user={user}
        setUser={setUser}
        users={users}
        nextTurn={nextTurn}
        throws={throws}
        setThrows={setThrows}
      />
      <NumberPad key={"numberpad"} setThrows={setThrows} hidden={user.turn} />
      {!started && <button onClick={startGame}>Start Game</button>}
    </div>
  );
}
