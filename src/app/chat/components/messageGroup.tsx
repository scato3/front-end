import React, { forwardRef } from 'react';
import { IMessageType } from '@/types/chat/chat';
import styles from '../chat.module.scss';
import Image from 'next/image';
import { formatKoreanDate, formatKoreanTime } from '@/utils/dateformat';

interface MessageGroupProps {
  messages: IMessageType[];
  myId: string;
}

export const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ messages, myId }, ref) => {
    const sortedMessages = [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const groupedMessages = sortedMessages.reduce(
      (acc: { date: string; messages: IMessageType[] }[], message) => {
        const messageDate = message.createdAt.split('T')[0]; // ISO 날짜에서 시간 제거
        const lastGroup = acc[acc.length - 1];

        if (!lastGroup || lastGroup.date !== messageDate) {
          acc.push({ date: messageDate, messages: [message] });
        } else {
          lastGroup.messages.push(message);
        }

        return acc;
      },
      []
    );

    return (
      <div ref={ref} className={styles.messageContainer}>
        {groupedMessages.map((group) => (
          <div key={group.date}>
            {/* 날짜 포맷 */}
            <div className={styles.dateContainer}>
              <p>{formatKoreanDate(group.date)}</p>
            </div>
            {group.messages.map((message, index, allMessages) => {
              const isMyMessage = message.sender._id === myId;
              const isFirstMessageByUser =
                index === 0 ||
                allMessages[index - 1]?.sender._id !== message.sender._id;

              return (
                <div
                  key={message._id}
                  className={
                    isMyMessage
                      ? styles.myMessageContainer
                      : styles.otherMessageContainer
                  }
                >
                  {!isMyMessage && isFirstMessageByUser && (
                    <div className={styles.profile}>
                      <Image
                        src={message.sender.pic}
                        alt={message.sender.nickname}
                        width={64}
                        height={64}
                      />
                    </div>
                  )}
                  <div
                    className={`${styles.messageContent} ${
                      isFirstMessageByUser ? '' : styles.messageIndent
                    }`}
                  >
                    {isFirstMessageByUser && !isMyMessage && (
                      <span className={styles.sender}>
                        {message.sender.nickname}
                      </span>
                    )}
                    <div className={styles.messageWrapper}>
                      {isMyMessage && (
                        <span className={styles.messageTimeLeft}>
                          {formatKoreanTime(message.createdAt)}
                        </span>
                      )}
                      <div
                        className={
                          isMyMessage ? styles.myMessage : styles.otherMessage
                        }
                      >
                        <span className={styles.content}>
                          {message.content}
                        </span>
                      </div>
                      {!isMyMessage && (
                        <span className={styles.messageTimeRight}>
                          {formatKoreanTime(message.createdAt)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
);

MessageGroup.displayName = 'MessageGroup';
