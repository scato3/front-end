'use client';

import styles from './chat.module.scss';
import Image from 'next/image';
import { IconArrow, IconMenu, IconMegaPhone } from '../../../public/icons';
import { IconSearch } from '../../../public/footer';
import { ArrowDown } from '../../../public/arrow';
import io, { Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import { getAppCookie } from '@/utils/cookie';
import { useSearchParams } from 'next/navigation';

interface IMessage {
  sender: string;
  content: string;
  timestamp: string;
}

export default function ChatClient() {
  const [socket, setSocket] = useState<null | typeof Socket>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false); // 연결 여부 상태
  const accessToken = getAppCookie(
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string
  );
  const messageBoxRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId') as string; // 스터디 ID 추출

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_CHAT_URL as string, {
      path: '/chat/socket.io/',
      auth: {
        token: `Bearer ${accessToken}`,
      },
    });

    newSocket.emit('join room', studyId); // 스터디방 연결
    newSocket.on('connected', () => {
      console.log('소켓 연결됨');
      setSocketConnected(true);
    }); // 연결 성공 여부 확인
    newSocket.on('message received', (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    newSocket.on('typing', () => setIsTyping(true));
    newSocket.on('stop typing', () => setIsTyping(false));

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [accessToken, studyId]);

  const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newMessage && socket) {
      socket.emit('new message', { content: newMessage, sender: 'user' });
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: 'user',
          content: newMessage,
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className={styles.Navigation}>
        <Image
          src={IconArrow}
          alt="화살표 이미지"
          width={12.67}
          height={22}
          className={styles.arrowImage}
        />
        <h2>스터디명</h2>
        <Image src={IconMenu} alt="메뉴 아이콘" className={styles.menuImage} />
        <Image
          src={IconSearch}
          alt="서치 아이콘"
          width={18}
          height={18}
          className={styles.searchImage}
        />
      </div>

      <div className={styles.noticeContainer}>
        <Image
          src={IconMegaPhone}
          alt="메가폰"
          className={styles.megaPhoneImage}
        />
        <p>채팅창 상단 고정 내용</p>
        <Image src={ArrowDown} alt="메가폰" className={styles.ArrowDownImage} />
      </div>

      <div className={styles.messageContainer} ref={messageBoxRef}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.sender}>{message.sender}:</span>
            <span className={styles.content}>{message.content}</span>
          </div>
        ))}
        {isTyping && (
          <div className={styles.typingIndicator}>상대방이 입력 중...</div>
        )}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={sendMessage}
        placeholder="메시지를 입력하세요"
        className={styles.inputBox}
      />

      {/* 소켓 연결 상태를 확인할 수 있는 부분 */}
      {socketConnected ? <p>연결됨</p> : <p>연결 대기 중...</p>}
    </>
  );
}
