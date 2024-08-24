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
  firstScore,
}: {
  user: TUser;
  users: TUsers;
  setUser: Dispatch<SetStateAction<TUser>>;
  setUsers: Dispatch<SetStateAction<TUsers>>;
  firstScore: number;
}) {
  const [started, setStarted] = useState<boolean>(false);
  const [throws, setThrows] = useState<TThrows>([]);
  const [double, setDouble] = useState<boolean>(false);
  const [triple, setTriple] = useState<boolean>(false);

  const socket = useSocket();

  const handlePadClick = (value: number | string) => {
    if (typeof value === "number") {
      setThrows((prevThrows) => {
        let calcedValue = value;
        if (double) {
          calcedValue = value * 2;
        } else if (triple) {
          calcedValue = value * 3;
        }
        const thrower = prevThrows[prevThrows.length - 1][0];
        const score = scoreBefore(thrower);
        if (score - calcedValue > 0) {
          const newThrows = [...prevThrows];
          const updatedThrows = [
            ...prevThrows[prevThrows.length - 1][1],
            calcedValue,
          ];
          newThrows[newThrows.length - 1] = [thrower, updatedThrows];
          return newThrows;
        } else {
          return prevThrows;
        }
      });
      setDouble(false);
      setTriple(false);
    } else if (value === "backspace") {
      // setThrows((prevThrows) => [prevThrows[0], prevThrows[1].slice(0, -1)]);
    } else if (value === "double") {
      setDouble((prevDouble) => !prevDouble);
      setTriple(false);
    } else if (value === "triple") {
      setTriple((prevTiple) => !prevTiple);
      setDouble(false);
    }
  };

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
  }, [socket, users, handlePadClick]);

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
    return userThrows.reduce((prev, curr) => prev - curr, firstScore);
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
        firstScore={firstScore}
      />
      <NumberPad
        key={"numberpad"}
        setThrows={setThrows}
        hidden={user.turn}
        double={double}
        triple={triple}
      />
      {!started && <button onClick={startGame}>Start Game</button>}
    </div>
  );
}
