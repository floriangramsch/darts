import { useSocket } from "@/helper/socketContext";
import { TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function LoginForm({
  setUser,
  setUsers,
}: {
  setUser: Dispatch<SetStateAction<TUser>>;
  setUsers: Dispatch<SetStateAction<TUsers>>;
}) {
  const [name, setName] = useState("");

  const socket = useSocket();

  const login = () => {
    if (name !== "") {
      const newUser: TUser = {
        logged: true,
        name: name,
        turn: false,
        score: 301,
      };
      setUser(newUser);
      // setUsers((prevUsers) => [...prevUsers, { name: name, turn: false }]);
      socket?.emit("login", { name: name });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        login();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [name]);

  return (
    <div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        autoFocus={true}
      />
      <button type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
}
