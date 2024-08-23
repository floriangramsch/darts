import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Overview from "./Overview";
import { TUser, TUsers } from "@/helper/types";
import { useSocket } from "@/helper/socketContext";
import Darts from "./Darts";

export default function StartPage() {
  const [user, setUser] = useState<TUser>({
    logged: false,
    name: undefined,
    turn: false,
    score: 301,
  });
  const [users, setUsers] = useState<TUsers>([]);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("logged", (data) =>
        setUsers((prevUsers) => [
          ...prevUsers,
          { name: data.name, logged: false, turn: false, score: 301 },
        ])
      );

      return () => {
        socket.off("logged");
      };
    }
  }, [socket]);

  return (
    <>
      {user.logged ? (
        <div>
          <Darts
            user={user}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
          />
        </div>
      ) : (
        <>
          <LoginForm setUser={setUser} setUsers={setUsers} />
        </>
      )}
    </>
  );
}
