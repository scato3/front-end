export interface IMessageType {
  index: number;
  content: string;
  createdAt: string;
  isPic: boolean;
  readBy: string[];
  sender: SenderInfo;
  chat: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface SenderInfo {
  nickname: string;
  pic: string;
  _id: string;
}

export interface IChatInfo {
  _id: string;
  chatName: string;
  createdAt: string;
  groupAdmin: string | null;
  isDeleted: boolean;
  isGroupChat: boolean;
  joinDates: string[];
  latestMessage: string;
  messageSeq: number;
  topNoti: string | null;
  updatedAt: string;
  __v: number;
  users: string[];
}

export interface IGetRecentChatResponse {
  chat: IChatInfo;
  messages: IMessageType[];
}

export interface JoinedType {
  reqUserId: string;
  roomId: string;
}
