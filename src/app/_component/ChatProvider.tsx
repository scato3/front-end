"use client";

import { IUser } from "@/interfaces/chat/IUser";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

type ChatContextType = {
  user: IUser | null;
  setUser: Function;
};

const ChatContext = createContext<ChatContextType>({
  user: null,
  setUser: (user: IUser) => {},
});

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  // const [notification, setNotification] = useState([]);
  const router = useRouter();

  return <ChatContext.Provider value={{ user, setUser }}>{children}</ChatContext.Provider>;
};
