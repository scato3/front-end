import { IChat } from "../chat/IChat";
import { IMessage } from "../chat/IMessage";
import { IUser } from "../chat/IUser";

export interface ChatStateType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  selectedChat?: IChat;
  setSelectedChat: React.Dispatch<React.SetStateAction<IChat | string>>;
  chats: IChat[];
  setChats: React.Dispatch<React.SetStateAction<IChat[]>>;
  notification: IMessage[];
  setNotification: React.Dispatch<React.SetStateAction<IMessage[]>>;
}
