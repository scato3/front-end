"use client";
import { useEffect } from "react";
import { useSocket } from "../_component/SocketProvider";

export default function ChatPage() {
  const { socket, isConnected } = useSocket();
  console.log(socket);
  useEffect(() => {
    if (socket) {
      socket?.emit("setup", "setuptest");
      socket?.emit("test", "data");
    }
  }, [socket]);
  return <div>test</div>;
}
