'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import styles from './chat.module.scss';
import Image from 'next/image';
import {
  IconArrow,
  IconMenu,
  IconMegaPhone,
  IconBlackAdd,
} from '../../../public/icons';
import { IconSearch } from '../../../public/footer';
import { ArrowDown } from '../../../public/arrow';
import { getAppCookie } from '@/utils/cookie';
import { useGetRecentChat } from '@/apis/chat/chat';
import { IMessageType } from '@/types/chat/chat';

export default function ChatClient() {
  const [socket, setSocket] = useState<null | typeof Socket>(null);
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const [myMessages, setMyMessages] = useState<IMessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const router = useRouter();
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const studyId = Number(searchParams.get('studyId'));
  const accessToken = getAppCookie(
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string
  );

  const { data } = useGetRecentChat(studyId);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (!accessToken || !studyId) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_CHAT_URL as string, {
      path: '/chat/socket.io/',
      auth: {
        token: `Bearer ${accessToken}`,
      },
    });

    newSocket.on('connect', () => {
      // join chat 이벤트 호출
      newSocket.emit('join chat', studyId);

      // typing 이벤트
      newSocket.on('typing', () => {
        console.log('A user is typing...');
      });

      // stop typing 이벤트
      newSocket.on('stop typing', () => {
        console.log('A user stopped typing.');
      });

      // message received 이벤트
      newSocket.on('message received', (message: IMessageType) => {
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on('my message', (message: IMessageType) => {
        console.log(message);
        setMyMessages((prev) => [...prev, message]);
      });

      // disconnect 이벤트
      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage.trim() && socket) {
      const message = {
        content: newMessage,
        studyId,
      };
      socket.emit('new message', message);
      setNewMessage('');
    }
  };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // const handleFileUpload = (file: File) => {
  //   console.log('Uploaded file:', file);
  // };

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, myMessages]);

  return (
    <>
      {/* Navigation Bar */}
      <div className={styles.Navigation}>
        <Image
          src={IconArrow}
          alt="화살표 이미지"
          width={12.67}
          height={22}
          className={styles.arrowImage}
          onClick={() => {
            router.back();
          }}
        />
        <h2>채팅방: {studyId}</h2>
        <Image src={IconMenu} alt="메뉴 아이콘" className={styles.menuImage} />
        <Image
          src={IconSearch}
          alt="서치 아이콘"
          width={18}
          height={18}
          className={styles.searchImage}
        />
      </div>

      {/* Notice Bar */}
      <div className={styles.noticeContainer}>
        <Image
          src={IconMegaPhone}
          alt="메가폰"
          className={styles.megaPhoneImage}
        />
        <p>채팅창 상단 고정 내용</p>
        <Image src={ArrowDown} alt="메가폰" className={styles.ArrowDownImage} />
      </div>

      {/* Message Container */}
      <div className={styles.messageContainer} ref={messageBoxRef}>
        {[...messages, ...myMessages]
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          ) // 시간 순 정렬
          .map((message, index, allMessages) => {
            const isMyMessage = myMessages.includes(message); // 내 메시지 여부 확인
            const isFirstMessageByUser =
              index === 0 ||
              allMessages[index - 1]?.sender._id !== message.sender._id; // 작성자 변경 감지

            return (
              <div
                key={message._id}
                className={
                  isMyMessage
                    ? styles.myMessageContainer
                    : styles.otherMessageContainer
                }
              >
                {/* 프로필 및 닉네임 표시 */}
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

                {/* 메시지 내용 */}
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
                  {/* 시간 위치: 내 메시지면 왼쪽, 상대 메시지면 오른쪽 */}
                  {isMyMessage && (
                    <span className={styles.messageTimeLeft}>
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  )}
                  {/* 시간 위치: 상대 메시지면 오른쪽 */}
                  {!isMyMessage && (
                    <span className={styles.messageTimeRight}>
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </span>
                  )}
                  <div
                    className={
                      isMyMessage ? styles.myMessage : styles.otherMessage
                    }
                  >
                    <span className={styles.content}>{message.content}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Input Box */}
      <div className={styles.inputBoxContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={sendMessage}
          className={styles.inputBox}
        />
        <Image
          src={IconBlackAdd}
          alt="이미지 더하기"
          className={styles.inputAddIcon}
        />
      </div>
    </>
  );
}
