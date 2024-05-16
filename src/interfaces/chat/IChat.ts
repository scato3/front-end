import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
  latestMessage: IMessage;
  isGroupChat: boolean;
  users: IUser[];
  _id: string;
  chatName: string;
  groupAdmin: IUser;
}
