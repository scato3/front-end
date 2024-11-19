'use client';

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
// import io, { Socket } from 'socket.io-client';
import { useRef, useState } from 'react';
// import { getAppCookie } from '@/utils/cookie';
// import { useSearchParams } from 'next/navigation';
import { uploadFile } from '@/utils/fileUpload';

// interface IMessage {
//   sender: string;
//   content: string;
//   timestamp: string;
// }

export default function ChatClient() {
  // const [socket, setSocket] = useState<null | typeof Socket>(null);
  // const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  // const [isTyping, setIsTyping] = useState<boolean>(false);
  // const [socketConnected, setSocketConnected] = useState<boolean>(false); // 연결 여부 상태
  // const accessToken = getAppCookie(
  //   process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string
  // );
  const messageBoxRef = useRef<HTMLDivElement>(null);
  // const [joinDate, setJoinDate] = useState<IJoinData[]>([]);

  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (!user) return;

  //   const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_CHAT_URL as string, {
  //     path: '/chat/socket.io/',
  //     auth: {
  //       token: `Bearer ${accessToken}`,
  //     },
  //   });

  //   newSocket.emit('setup', user);
  //   newSocket.on('connected', () => setSocketConnected(true));
  //   newSocket.on('typing', () => setIsTyping(true));
  //   newSocket.on('stop typing', () => setIsTyping(false));
  //   newSocket.on('error', (error: unknown) => {
  //     console.log('Socket connection error:', error);
  //   });
  //   newSocket.on('user joined', (data) => {
  //     if (data?.joinDates.length > 0) {
  //       setJoinDate(
  //         data?.joinDates.map((date: IJoinDate, idx: number) => {
  //           return { userInfo: data.users[idx + 1], ...date };
  //         })
  //       );
  //     }
  //   });

  //   setSocket(newSocket);

  //   return () => {
  //     newSocket.off('message received');
  //     newSocket.off('typing');
  //     newSocket.off('stop typing');
  //     newSocket.off('user joined');
  //     newSocket.disconnect();
  //   };
  // }, [socket]);

  // const sendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' && newMessage && socket) {
  //     socket.emit('new message', { content: newMessage, sender: 'user' });
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       {
  //         sender: 'user',
  //         content: newMessage,
  //         timestamp: new Date().toISOString(),
  //       },
  //     ]);
  //     setNewMessage('');
  //   }
  // };

  // const scrollToBottom = () => {
  //   if (messageBoxRef.current) {
  //     messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
  //   }
  // };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

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
        {/* {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            <span className={styles.sender}>{message.sender}:</span>
            <span className={styles.content}>{message.content}</span>
          </div>
        ))} */}
      </div>

      <div className={styles.inputBoxContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          // onKeyDown={sendMessage}
          className={styles.inputBox}
        />
        <Image
          src={IconBlackAdd}
          alt="이미지 더하기"
          className={styles.inputAddIcon}
          onClick={() => uploadFile(handleFileUpload)}
        />
      </div>
    </>
  );
}
