"use client";
import { IJoinDate } from "@/interfaces/chat/IJoinDate";
import { IMessage } from "@/interfaces/chat/IMessage";
import { IUser } from "@/interfaces/chat/IUser";
import { isSameSender } from "@/utils/chatLogics";
import { Avatar } from "@chakra-ui/react";
import moment from "moment-timezone";
import "moment/locale/ko";
import { useEffect, useState } from "react";
import styles from "./chatBox.module.css";
interface IJoinData extends IJoinDate {
  userInfo: IUser;
}
export default function ChatBox({
  messages,
  userId,
  joinDates,
}: {
  messages: IMessage[];
  userId: string;
  joinDates: IJoinData[];
}) {
  interface IChatGroupByDate {
    date?: string;
    messages?: IMessage[];
    joinDate?: string;
    joiner?: string[];
  }
  const [chatGroupByDate, setChatGroupByDate] = useState<IChatGroupByDate[] | null>(null);

  function groupedMessages(messages: IMessage[]) {
    let joinGroups: Record<string, { joinDate: string; joiner: string[] }> = {};
    let messageGroups: Record<string, { date: string; messages: IMessage[] }> = {};

    if (joinDates?.length > 0) {
      joinDates.forEach((joinDate: IJoinData) => {
        const date = moment(joinDate.joinedDate).tz("Asia/Seoul").toString().slice(0, 16);
        if (!joinGroups[date]) {
          joinGroups[date] = {
            joinDate: date,
            joiner: [joinDate?.userInfo?.nickname],
          };
        } else {
          joinGroups[date].joiner.push(joinDate?.userInfo?.nickname);
        }
      });
    }

    if (messages?.length > 0) {
      messages.forEach((message: IMessage) => {
        const date = moment(message.createdAt).tz("Asia/Seoul").toString().slice(0, 16);
        if (!messageGroups[date]) {
          messageGroups[date] = {
            date: date,
            messages: [message],
          };
        } else {
          messageGroups[date].messages.push(message);
        }
      });
    }

    const combinedKeys = new Set([...Object.keys(joinGroups), ...Object.keys(messageGroups)]);
    const combinedArray: IChatGroupByDate[] = Array.from(combinedKeys).map((key) => ({
      ...joinGroups[key],
      ...messageGroups[key],
    }));
    return combinedArray;
  }

  useEffect(() => {
    if (messages?.length > 0 || joinDates?.length > 0) setChatGroupByDate(groupedMessages(messages));
  }, [messages, joinDates]);

  return (
    <div className={styles.chatBox}>
      {chatGroupByDate &&
        chatGroupByDate.map((group, idx) => (
          <div key={idx} className={styles.chatContainer}>
            <div className={styles.chatDateBox}>
              <h2 className={styles.chatDate}>{moment(group.date).format("YYYY년 MM월 DD일 dddd")}</h2>
            </div>
            {group?.joinDate &&
              group?.joiner &&
              group?.joiner.map(
                (join, idx) =>
                  join && (
                    <div className={styles.joinDateBox} key={idx}>
                      {join}님이 참여했어요
                    </div>
                  ),
              )}
            {group.messages &&
              group.messages.map((message: IMessage, idx: number) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: isSameSender(messages, message, idx, userId) ? "start" : "end",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                  key={message._id}
                >
                  {isSameSender(messages, message, idx, userId) && (
                    <Avatar
                      width={54}
                      height={54}
                      borderRadius={100}
                      mb="7px"
                      mr="14px"
                      size="sm"
                      cursor="pointer"
                      name={message.sender.nickname}
                      src={message.sender.pic}
                    />
                  )}
                  {isSameSender(messages, message, idx, userId) ? (
                    <div
                      style={{
                        marginTop: 3,
                        marginBottom: 3,
                        display: "flex",
                        alignItems: "end",
                        gap: "3px",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span>{message.sender.nickname}</span>
                        <div
                          style={{
                            backgroundColor: `#d9d9d8`,
                            padding: "5px 15px",
                            maxWidth: "350px",
                            wordWrap: "break-word",
                            marginTop: "3px",
                            fontSize: "16px",
                            lineHeight: "27px",
                          }}
                        >
                          {message.content}
                        </div>
                      </div>
                      <span className={styles.sendDate}> {moment(message.createdAt).format("A HH:mm")}</span>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "end",
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                    >
                      <span className={styles.sendDate}> {moment(message.createdAt).format("A HH:mm")}</span>
                      <div
                        style={{
                          backgroundColor: `${message.sender._id === userId ? "#ffd4bd" : "#d9d9d8"}`,
                          padding: "10px 16px",
                          maxWidth: "350px",
                          height: "auto",
                          wordWrap: "break-word",
                        }}
                      >
                        {message.content}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
