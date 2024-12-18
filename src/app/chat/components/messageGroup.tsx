import React, { forwardRef, useEffect, useRef } from 'react';
import { IMessageType } from '@/types/chat/chat';
import styles from '../chat.module.scss';
import Image from 'next/image';
import { formatKoreanDate, formatKoreanTime } from '@/utils/dateformat';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface MessageGroupProps {
  messages: IMessageType[];
  myId: string;
  onTopVisible: () => void; // 맨 위 메시지가 보일 때 실행할 함수
}

export const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ messages, myId, onTopVisible }, ref) => {
    const topItemRef = useRef<HTMLDivElement | null>(null);

    const { observe } = useIntersectionObserver(onTopVisible, {
      threshold: 0.1,
    });

    useEffect(() => {
      if (messages.length) {
        observe(topItemRef.current); // 맨 위 아이템을 관측
      }
    }, [messages, observe]);

    const groupedMessages = messages.reduce<{
      [date: string]: IMessageType[];
    }>((acc, message) => {
      const date = message.createdAt.split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(message);
      return acc;
    }, {});

    return (
      <div ref={ref} className={styles.messageContainer}>
        {Object.entries(groupedMessages).map(([date, groupMessages], idx) => (
          <div key={date}>
            <div className={styles.dateContainer}>{formatKoreanDate(date)}</div>
            {groupMessages.map((message, index) => {
              const isMyMessage = message.sender._id === myId;

              const currentTime = formatKoreanTime(message.createdAt);
              const prevTime =
                index > 0
                  ? formatKoreanTime(groupMessages[index - 1].createdAt)
                  : null;

              const isSameTimeAndUser =
                prevTime === currentTime &&
                groupMessages[index - 1]?.sender._id === message.sender._id;

              const isLastMessageInTimeGroup =
                index === groupMessages.length - 1 ||
                formatKoreanTime(groupMessages[index + 1]?.createdAt) !==
                  currentTime ||
                groupMessages[index + 1]?.sender._id !== message.sender._id;

              return (
                <div
                  key={message._id}
                  className={
                    isMyMessage
                      ? styles.myMessageContainer
                      : styles.otherMessageContainer
                  }
                  ref={idx === 0 && index === 0 ? topItemRef : null} // 맨 위 메시지에 ref 할당
                >
                  {/* 프로필 및 닉네임 (첫 메시지만 표시) */}
                  {!isMyMessage && !isSameTimeAndUser && (
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
                      isSameTimeAndUser ? styles.messageIndent : ''
                    }`}
                  >
                    {/* 닉네임 표시 */}
                    {isMyMessage || isSameTimeAndUser ? null : (
                      <span className={styles.sender}>
                        {message.sender.nickname}
                      </span>
                    )}

                    <div className={styles.messageWrapper}>
                      {isMyMessage && isLastMessageInTimeGroup && (
                        <span className={styles.messageTimeLeft}>
                          {currentTime}
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
                      {!isMyMessage && isLastMessageInTimeGroup && (
                        <span className={styles.messageTimeRight}>
                          {currentTime}
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
