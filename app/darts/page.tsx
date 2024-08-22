"use client";

import { useEffect, useState } from "react";
import { socket } from "../../socket.js";

export default function DartPage() {
  const [score, setScore] = useState<number[]>([]);

  useEffect(() => {
    socket.on("connect", () => console.log("connected to socketIO"));

    socket.on("update", (data) => {
      console.log("Update erhalten:", data);
      setScore((prevScore) => [...prevScore, data.score]);
    });

    return () => {
      socket.off("connect", () => console.log("disconnected to socketIO"));
      // socket.off("disconnect", onDisconnect);
      socket.off("update");
    };
  }, []);

  const handleThrow = () => {
    const newScore = Math.floor(Math.random() * 180) + 1;
    socket.emit("dart-action", { score: newScore });
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
