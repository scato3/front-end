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
import { IconAdd, IconOut } from '../../../public/icons';
import { RightArrow } from '../../../public/arrow';
import { menuItems } from '@/data/menu';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function ChatClient() {
  const [socket, setSocket] = useState<null | typeof Socket>(null);
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const [myMessages, setMyMessages] = useState<IMessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const router = useRouter();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true); // 스크롤이 맨 아래에 있는지 여부
  const animationFrameId = useRef<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

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

      // message received 이벤트
      newSocket.on('message received', (message: IMessageType) => {
        setMessages((prev) => [...prev, message]);
        console.log(messages);
        console.log(message);
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

  useEffect(() => {
    console.log(myMessages);
  }, [myMessages]);

  // 메뉴 토글 함수
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

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

  //** TODO 코드 학습 필요**

  // 스크롤 위치 감지
  const handleScroll = () => {
    if (messageBoxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageBoxRef.current;
      const atBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 10;
      setIsAtBottom(atBottom);
    }
  };

  // 메시지가 추가될 때 스크롤 처리
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      animationFrameId.current = requestAnimationFrame(() => {
        messageBoxRef.current!.scrollTop = messageBoxRef.current!.scrollHeight;
      });
    }
  };

  // 메시지가 변경될 때 처리
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [messages, myMessages]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    if (messageBoxRef.current) {
      const box = messageBoxRef.current;
      box.addEventListener('scroll', handleScroll);
      return () => box.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // const handleFileUpload = (file: File) => {
  //   console.log('Uploaded file:', file);
  // };

  // 채팅이 새로 생기면 항상 아래를 본다.

  return (
    <div className={styles.Container}>
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
        <h2>{data?.chat.chatName}</h2>
        <Image
          src={IconMenu}
          alt="메뉴 아이콘"
          className={styles.menuImage}
          onClick={toggleMenu}
        />
        <Image
          src={IconSearch}
          alt="서치 아이콘"
          width={18}
          height={18}
          className={styles.searchImage}
        />
      </div>
      {/* 메뉴 오버레이 */}
      <div
        className={`${styles.menuOverlay} ${menuVisible ? styles.visible : styles.unvisible}`}
        onClick={toggleMenu}
      >
        <div
          className={`${styles.menuContent} ${
            menuVisible ? styles.visible : styles.unvisible
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.menuHeaderWrapper}>
            <h2>스터디 캔버스</h2>
            <Image
              src={IconAdd}
              alt="X 아이콘"
              className={styles.IconAdd}
              width={16.4}
              height={16.4}
              onClick={toggleMenu}
            />
          </div>
          <section className={styles.menuSection}>
            {menuItems.map((item) =>
              item.isSectionHeader ? (
                <div key={item.label} className={styles.sectionHeader}>
                  {item.label}
                </div>
              ) : (
                <div key={item.label} className={styles.menuItem}>
                  <span>{item.label}</span>
                  {item.hasMemberIcons && (
                    <div className={styles.memberIcons}>
                      <div className={styles.memberCircle} />
                      <div className={styles.memberCircle} />
                      <div className={styles.memberCircle} />
                    </div>
                  )}
                  <Image
                    src={RightArrow}
                    alt="Right Arrow Icon"
                    className={styles.arrowIcon}
                  />
                </div>
              )
            )}
          </section>
          <div className={styles.buttonWrapper}>
            <Image src={IconOut} alt="나가기 아이콘" />
            <button className={styles.button}>스터디 나가기</button>
          </div>
        </div>
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
          )
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
                  <div className={styles.messageWrapper}>
                    {/* 시간 위치: 내 메시지면 왼쪽, 상대 메시지면 오른쪽 */}
                    {isMyMessage && (
                      <span className={styles.messageTimeLeft}>
                        {dayjs(message.createdAt).format('A h:mm')}
                      </span>
                    )}
                    <div
                      className={
                        isMyMessage ? styles.myMessage : styles.otherMessage
                      }
                    >
                      <span className={styles.content}>{message.content}</span>
                    </div>
                    {/* 시간 위치: 상대 메시지면 오른쪽 */}
                    {!isMyMessage && (
                      <span className={styles.messageTimeRight}>
                        {dayjs(message.createdAt).format('A h:mm')}
                      </span>
                    )}
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
    </div>
  );
}
