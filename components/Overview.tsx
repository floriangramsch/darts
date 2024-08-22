import { TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction, useState } from "react";
import Player from "./Player";
import NumberPad from "./NumberPad";

export default function Overview({
  user,
  setUser,
  users,
}: {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
  users: TUsers;
}) {
  const [throws, setThrows] = useState<number[]>([]);
  return (
    <div>
      Welcome {user.name}
      <button
        className="bg-yellow-500 rounded p-1"
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
          return (
            <>
              <Player throws={throws} user={user} />
              <NumberPad setThrows={setThrows} />
            </>
          );
        })}
      </div>
    </div>
  );
}
