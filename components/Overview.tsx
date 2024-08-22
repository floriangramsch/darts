import { TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction } from "react";

export default function Overview({
  user,
  setUser,
  users,
}: {
  user: TUser;
  setUser: Dispatch<SetStateAction<TUser>>;
  users: TUsers[];
}) {
  return (
    <div>
      Welcome {user.name}
      <button
        className="bg-yellow-500 rounded p-1"
        onClick={() => {
          setUser({
            logged: false,
            name: undefined,
          });
        }}
      >
        Logout
      </button>
      <div>
        {users.map((user, i) => {
          return (
            <div key={i}>
              {user.name} {user.turn ? "x" : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
