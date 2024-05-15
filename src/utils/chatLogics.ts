import { IMessage } from "@/interfaces/chat/IMessage";
import { IUser } from "@/interfaces/chat/IUser";

export const getSender = (loggedUser: IUser, users: IUser[]) => {
  return users[0]?._id === loggedUser?._id ? users[1].nickname : users[0].nickname;
};

export const getSenderFull = (loggedUser: IUser, users: IUser[]) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSender = (messages: IMessage[], message: IMessage, idx: number, userId: string) => {
  return (
    idx < messages.length - 1 &&
    (messages[idx + 1]?.sender?._id !== message?.sender?._id || messages[idx + 1]?.sender?._id === undefined) &&
    message.sender?._id !== userId
  );
};

export const isLastMessage = (messages: IMessage[], idx: number, userId: string) => {
  return (
    idx === messages.length - 1 &&
    messages[messages.length - 1]?.sender?._id !== userId &&
    messages[messages.length - 1]?.sender?._id
  );
};

export const isSameSenderMargin = (messages: IMessage[], message: IMessage, idx: number, userId: string) => {
  if (
    idx < messages.length - 1 &&
    messages[idx + 1]?.sender?._id === message?.sender?._id &&
    message.sender?._id !== userId
  )
    return 33;
  else if (
    (idx < messages.length - 1 &&
      messages[idx + 1]?.sender?._id !== message?.sender?._id &&
      message.sender?._id !== userId) ||
    (idx === messages.length - 1 && messages[idx].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages: IMessage[], message: IMessage, idx: number) => {
  return idx > 0 && messages[idx - 1].sender._id === message?.sender?._id;
};
