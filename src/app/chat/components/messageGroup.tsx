import React, { forwardRef, useEffect, useRef } from 'react';
import { IMessageType } from '@/types/chat/chat';
import styles from '../chat.module.scss';
import Image from 'next/image';
import { formatKoreanDate, formatKoreanTime } from '@/utils/dateformat';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useChatStore } from '@/store/chatStore';

interface MessageGroupProps {
  messages: IMessageType[];
  myId: string;
  onTopVisible: () => void;
}

export const MessageGroup = forwardRef<HTMLDivElement, MessageGroupProps>(
  ({ messages, myId, onTopVisible }, ref) => {
    const topItemRef = useRef<HTMLDivElement | null>(null);
    const { searchResults, currentSearchIndex } = useChatStore();

    const { observe } = useIntersectionObserver(onTopVisible, {
      threshold: 0.1,
    });

    useEffect(() => {
      if (messages.length) {
        observe(topItemRef.current);
      }
    }, [messages, observe]);

    // 검색된 메시지로 스크롤
    useEffect(() => {
      if (searchResults.length > 0) {
        const targetIndex = searchResults[currentSearchIndex];
        const targetMessage = messages.find((msg) => msg.index === targetIndex);
        if (targetMessage) {
          const element = document.getElementById(
            `message-${targetMessage._id}`
          );
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.classList.add(styles.highlighted);
            setTimeout(() => {
              element.classList.remove(styles.highlighted);
            }, 2000);
          }
        }
      }
    }, [currentSearchIndex, searchResults, messages]);

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
              const isSearchedMessage = searchResults.includes(message.index);

              return (
                <div
                  key={message._id}
                  id={`message-${message._id}`}
                  className={`
                    ${isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer}
                  `}
                  ref={idx === 0 && index === 0 ? topItemRef : null}
                >
                  {!isMyMessage && !isSameTimeAndUser && (
                    <div className={styles.profile}>
                      <Image
                        src={message.sender.pic}
                        alt={message.sender.nickname}
                        width={64}
                        height={64}
                        className={styles.profileImage}
                      />
                    </div>
                  )}

                  <div
                    className={`${styles.messageContent} ${
                      isSameTimeAndUser ? styles.messageIndent : ''
                    }`}
                  >
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
                        className={`
                          ${isMyMessage ? styles.myMessage : styles.otherMessage}
                          ${isSearchedMessage ? styles.searchedMessage : ''}
                        `}
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
