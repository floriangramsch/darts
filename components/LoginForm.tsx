import { useSocket } from "@/helper/socketContext";
import { TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction, useState } from "react";

export default function LoginForm({
  setUser,
  setUsers,
}: {
  setUser: Dispatch<SetStateAction<TUser>>;
  setUsers: Dispatch<SetStateAction<TUsers[]>>;
}) {
  const [name, setName] = useState("");

  const socket = useSocket();

  const login = () => {
    if (name !== "") {
      const newUser: TUser = {
        logged: true,
        name: name,
      };
      setUser(newUser);
      // setUsers((prevUsers) => [...prevUsers, { name: name, turn: false }]);
      socket?.emit("login", { name: name });
    }
  };

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
}
