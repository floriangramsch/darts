import { TThrows, TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Player from "./Player";

export default function Overview({
  user,
  setUser,
  users,
  throws,
}: {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
  users: TUsers;
  nextTurn: () => void;
  throws: TThrows;
  setThrows: Dispatch<SetStateAction<TThrows>>;
}) {
  return (
    <div>
      Welcome {user.name}
      <button
        className="bg-fg text-text rounded-lg p-2 shadow"
        onClick={() => {
          setUser({
            logged: false,
            name: undefined,
            turn: false,
            score: 301,
          });
        }}
      >
        Logout
      </button>
      <div>
        {users.map((user, i) => {
          return <Player key={i} throws={throws} user={user} />;
        })}
      </div>
    </div>
  );
}
