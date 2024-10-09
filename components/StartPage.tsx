import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { TUser, TUsers } from "@/helper/types";
import { useSocket } from "@/helper/socketContext";
import Darts from "./Darts";

export default function StartPage() {
  const [firstScore, setFirstScore] = useState<number>(301);
  const [user, setUser] = useState<TUser | undefined>(undefined);
  const [users, setUsers] = useState<TUsers>([]);

  const socket = useSocket();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("logged", (data) =>
        setUsers((prevUsers) => {
          localStorage.setItem(
            "users",
            JSON.stringify([
              ...prevUsers,
              {
                name: data.name,
                logged: false,
                turn: false,
                score: firstScore,
              },
            ])
          );
          return [
            ...prevUsers,
            { name: data.name, logged: false, turn: false, score: firstScore },
          ];
        })
      );

      return () => {
        socket.off("logged");
      };
    }
  }, [socket]);

  return (
    <>
      {user && user.logged ? (
        <div>
          <Darts
            user={user}
            setUser={setUser}
            users={users}
            setUsers={setUsers}
            firstScore={firstScore}
          />
        </div>
      ) : (
        <>
          <LoginForm
            setUser={setUser}
            setUsers={setUsers}
            firstScore={firstScore}
          />
        </>
      )}
    </>
  );
}
