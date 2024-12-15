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
import { useGetRecentChat, useGetTargetChat } from '@/apis/chat/chat';
import { IMessageType, JoinedType } from '@/types/chat/chat';
import { IconAdd, IconOut } from '../../../public/icons';
import { RightArrow } from '../../../public/arrow';
import { menuItems } from '@/data/menu';
import { IGetRecentChatResponse } from '@/types/chat/chat';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export default function ChatClient() {
  const [socket, setSocket] = useState<null | typeof Socket>(null);
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const router = useRouter();
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const animationFrameId = useRef<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [myId, setMyId] = useState('');

  const searchParams = useSearchParams();
  const studyId = Number(searchParams.get('studyId'));
  const accessToken = getAppCookie(
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string
  );

  const { data } = useGetRecentChat(studyId);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const startIndexRef = useRef<number | null>(null);

  const params = {
    startIndex: startIndex ?? 0,
    findIndex: startIndex && startIndex > 30 ? startIndex - 30 : 0,
  };

  const { isFetching, refetch } = useGetTargetChat(studyId, {
    ...params,
    onSuccess: (newData: IGetRecentChatResponse) => {
      if (newData) {
        const newMinIndex = Math.min(
          ...newData.messages.map((message) => message.index)
        );
        setStartIndex(newMinIndex);
        startIndexRef.current = newMinIndex;
      }
    },
  });

  useEffect(() => {
    if (!data?.messages) return;

    const minIndex = Math.min(...data.messages.map((message) => message.index));
    setStartIndex(minIndex);
    startIndexRef.current = minIndex;

    // 모든 메시지를 messages 상태로 저장
    setMessages(data.messages);

    console.log('최소 index:', minIndex);
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

      newSocket.on('joined chat', (message: JoinedType) => {
        setMyId(message.reqUserId);
      });

      // message received 이벤트
      newSocket.on('message received', (message: IMessageType) => {
        setMessages((prev) => [...prev, message]);
        console.log(messages);
        console.log(message);
      });

      newSocket.on('my message', (message: IMessageType) => {
        console.log(message);
        setMessages((prev) => [...prev, message]);
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
      const { scrollTop } = messageBoxRef.current;

      // 스크롤이 맨 위에 닿으면 refetch 호출
      if (scrollTop === 0 && !isFetching && startIndexRef.current !== 0) {
        console.log('Fetching previous messages...');
        console.log({
          startIndex: startIndexRef.current,
          findIndex:
            startIndexRef.current && startIndexRef.current > 30
              ? startIndexRef.current - 30
              : 0,
        });
        refetch();
      }

      // 스크롤 하단 감지
      const { scrollHeight, clientHeight } = messageBoxRef.current;
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
  }, [messages]);

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

      {/* Date */}
      <div className={styles.messageContainer} ref={messageBoxRef}>
        {messages
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .reduce(
            (acc: { date: string; messages: IMessageType[] }[], message) => {
              const messageDate = dayjs(message.createdAt).format('YYYY-MM-DD');
              const lastGroup = acc[acc.length - 1];

              if (!lastGroup || lastGroup.date !== messageDate) {
                acc.push({ date: messageDate, messages: [message] });
              } else {
                lastGroup.messages.push(message);
              }

              return acc;
            },
            []
          )
          .map((group) => (
            <div key={group.date}>
              {/* 날짜 출력 */}
              <div className={styles.dateContainer}>
                <p>{dayjs(group.date).format('YYYY년 M월 D일 dddd')}</p>
              </div>

              {/* 메시지 출력 */}
              {group.messages.map((message, index, allMessages) => {
                const isMyMessage = message.sender._id === myId; // 내 메시지 확인
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
                            {dayjs(message.createdAt).format('A h:mm')}
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
                            {dayjs(message.createdAt).format('A h:mm')}
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
