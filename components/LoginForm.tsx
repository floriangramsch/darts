import { useSocket } from "@/helper/socketContext";
import { TUser, TUsers } from "@/helper/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function LoginForm({
  setUser,
  firstScore
}: {
  setUser: Dispatch<SetStateAction<TUser>>;
  setUsers: Dispatch<SetStateAction<TUsers>>;
  firstScore: number
}) {
  const [name, setName] = useState("");

  const socket = useSocket();

  const login = () => {
    if (name !== "") {
      const newUser: TUser = {
        logged: true,
        name: name,
        turn: false,
        score: firstScore,
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
    <div className="flex flex-col items-center h-full justify-center space-y-3">
      <input
        className="rounded shadow w-64"
        onChange={(e) => {
          setName(e.target.value);
        }}
        autoFocus={true}
      />
      <button
        type="submit"
        onClick={login}
        className="bg-fg text-text rounded-lg p-2 shadow"
      >
        Login
      </button>
    </div>
  );
}
