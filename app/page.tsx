"use client";

import StartPage from "@/components/StartPage";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  return <StartPage />;
}
