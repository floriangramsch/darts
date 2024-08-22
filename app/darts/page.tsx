"use client";

import { useEffect, useState } from "react";
import { useSocket } from "@/helper/socketContext";

export default function DartPage() {
  const [score, setScore] = useState<number[]>([]);

  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("update", (data) => {
        console.log("Update erhalten:", data);
        setScore((prevScore) => [...prevScore, data.score]);
      });
      // socket.on("connect", () => console.log("connected to socketIO"));
      return () => {
        // socket.off("connect", () => console.log("disconnected to socketIO"));
        socket.off("update");
      };
    }
  }, [socket]);

  const handleThrow = () => {
    if (socket) {
      const newScore = Math.floor(Math.random() * 180) + 1;
      socket.emit("dart-action", { score: newScore });
    }
  };

  return (
    <div>
      <h1>Dein aktueller Score:</h1>
      <button onClick={handleThrow}>Wurf machen</button>
      <div>
        {score.map((s, i) => {
          return <div key={i}>{s}</div>;
        })}
      </div>
    </div>
  );
}
