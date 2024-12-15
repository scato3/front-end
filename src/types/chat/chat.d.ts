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
