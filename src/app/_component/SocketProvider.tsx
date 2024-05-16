"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io";
import { io } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
  typing: boolean;
  isTyping: boolean;
  setIsConnected: Function;
  setTyping: Function;
  setIsTyping: Function;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  typing: false,
  isTyping: false,
  setIsConnected: (flag: boolean) => {},
  setTyping: (flag: boolean) => {},
  setIsTyping: (flag: boolean) => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any | Socket>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    const endPoint = process.env.NEXT_PUBLIC_SOCKET_PROD_API as string;
    const newSocket = io(endPoint);
    newSocket?.emit("setup", "test");

    newSocket.on("connected", () => setIsConnected(true));
    newSocket.on("typing", () => setIsTyping(true));
    newSocket.on("stop typing", () => setIsTyping(false));
    newSocket.on("error", (error: unknown) => {
      console.log("Socket connection error:", error);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, typing, isTyping, setIsConnected, setIsTyping, setTyping }}>
      {children}
    </SocketContext.Provider>
  );
};
