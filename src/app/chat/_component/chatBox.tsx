"use client";
import { IMessage } from "@/interfaces/chat/IMessage";
import { isSameSender } from "@/utils/chatLogics";
import { Avatar } from "@chakra-ui/react";
import moment from "moment-timezone";
import "moment/locale/ko";
import { useEffect, useState } from "react";
import styles from "./chatBox.module.css";

export default function ChatBox({ messages, userId }: { messages: IMessage[]; userId: string }) {
  interface IChatGroupByDate {
    date: string;
    messages: IMessage[];
  }
  const [chatGroupByDate, setChatGroupByDate] = useState<IChatGroupByDate[] | null>(null);

  function groupedMessages(messages: IMessage[]): IChatGroupByDate[] {
    return messages.reduce((groups: IChatGroupByDate[], message: IMessage) => {
      const date = moment(message.createdAt).tz("Asia/Seoul").toString().slice(0, 16);
      const existingGroup = groups.find((group) => group.date === date);

      if (!existingGroup) {
        groups.push({ date, messages: [message] });
      } else {
        existingGroup.messages.push(message);
      }

      return groups;
    }, []);
  }

  useEffect(() => {
    if (messages.length > 0) setChatGroupByDate(groupedMessages(messages));
  }, [messages]);

  return (
    <div className={styles.chatBox}>
      {chatGroupByDate &&
        chatGroupByDate.map((group) => (
          <div key={group.date} className={styles.chatContainer}>
            <div className={styles.chatDateBox}>
              <h2 className={styles.chatDate}>{moment(group.date).format("YYYY년 MM월 DD일 dddd")}</h2>
            </div>
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
