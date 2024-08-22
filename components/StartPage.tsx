import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Overview from "./Overview";
import { TUser, TUsers } from "@/helper/types";
import { socket } from "../socket.js";
import { useSocket } from "@/helper/socketContext";
import Darts from "./Darts";

export default function StartPage() {
  const [user, setUser] = useState<TUser>({
    logged: false,
    name: undefined,
  });
  const [users, setUsers] = useState<TUsers[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("logged", (data) =>
        setUsers((prevUsers) => [
          ...prevUsers,
          { name: data.name, turn: false },
        ])
      );

      return () => {
        socket.off("logged");
      };
    }
  }, []);

  return (
    <>
      {user.logged ? (
        <div>
          <Overview user={user} setUser={setUser} users={users} />
          <Darts users={users} setUsers={setUsers} />
        </div>
      ) : (
        <LoginForm setUser={setUser} setUsers={setUsers} />
      )}
    </>
  );
}
