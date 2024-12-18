'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import styles from './chat.module.scss';
import { getAppCookie } from '@/utils/cookie';
import { useGetRecentChat } from '@/apis/chat/chat';
import { IMessageType, JoinedType } from '@/types/chat/chat';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { MessageGroup } from './components/messageGroup';
import { ChatMenu } from './components/menu';
import { ChatNotice } from './components/notice';
import { InputBox } from './components/inputBox';
import { ChatNavigation } from './components/chatNavigation';
import { useGetTargetChat } from '@/apis/chat/chat';

dayjs.locale('ko');

export default function ChatClient() {
  const [socket, setSocket] = useState<null | typeof Socket>(null);
  const [messages, setMessages] = useState<IMessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const animationFrameId = useRef<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [myId, setMyId] = useState('');
  const [startIndex, setStartIndex] = useState<number>(0);

  const searchParams = useSearchParams();
  const studyId = Number(searchParams.get('studyId'));
  const accessToken = getAppCookie(
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY as string
  );

  const { data } = useGetRecentChat(studyId);

  useEffect(() => {
    if (!data?.messages) return;
    console.log(data);

    const sortedMessages = [...data.messages].sort(
      (a, b) => Number(a.index) - Number(b.index)
    );

    setMessages(sortedMessages);

    // 가장 작은 index 설정
    const minIndex = Math.min(
      ...sortedMessages.map((message) => message.index)
    );
    setStartIndex(minIndex);
  }, [data]);

  console.log(messages);

  const toggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  const { refetch: refetchTargetData, isFetching } = useGetTargetChat(studyId, {
    startIndex,
    findIndex: Math.max(startIndex - 30, 0),
  });

  const handleRefetch = async () => {
    if (isFetching || startIndex <= 0) return;

    const prevScrollHeight = messageBoxRef.current?.scrollHeight || 0;

    // 데이터 요청
    const { data } = await refetchTargetData();
    console.log('Fetched data:', data);

    const fetchedMessages: IMessageType[] = Array.isArray(data) ? data : [];

    if (fetchedMessages.length > 0) {
      setMessages((prevMessages) => {
        const uniqueMessages = new Map(
          [...fetchedMessages, ...prevMessages].map((msg) => [msg._id, msg])
        );

        const combinedMessages = Array.from(uniqueMessages.values()).sort(
          (a, b) => a.index - b.index
        );

        const newStartIndex =
          Math.min(...combinedMessages.map((msg) => msg.index)) - 1;

        setStartIndex(newStartIndex);

        return combinedMessages;
      });
      requestAnimationFrame(() => {
        if (messageBoxRef.current) {
          const newScrollHeight = messageBoxRef.current.scrollHeight;
          messageBoxRef.current.scrollTop = newScrollHeight - prevScrollHeight;
        }
      });
    }
  };

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

  // 메시지가 추가될 때 스크롤 처리
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      animationFrameId.current = requestAnimationFrame(() => {
        messageBoxRef.current!.scrollTop = messageBoxRef.current!.scrollHeight;
      });
    }
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    if (messageBoxRef.current) {
      const box = messageBoxRef.current;
      box.addEventListener('scroll', handleScroll);
      return () => box.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 스크롤 위치 감지
  const handleScroll = () => {
    if (messageBoxRef.current) {
      const atBottom =
        Math.abs(
          messageBoxRef.current.scrollTop +
            messageBoxRef.current.clientHeight -
            messageBoxRef.current.scrollHeight
        ) <= 10;
      setIsAtBottom(atBottom);
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

  // const handleFileUpload = (file: File) => {
  //   console.log('Uploaded file:', file);
  // };

  return (
    <div className={styles.Container}>
      <ChatNavigation
        chatName={data?.chat.chatName || '채팅방'}
        onMenuToggle={() => setMenuVisible(!menuVisible)}
        onSearchToggle={toggleSearch}
      />
      <ChatMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
      <ChatNotice isSearchActive={isSearchActive} studyId={studyId} />
      <MessageGroup
        messages={messages}
        myId={myId}
        ref={messageBoxRef}
        onTopVisible={handleRefetch}
      />
      <InputBox
        value={newMessage}
        onChange={setNewMessage}
        onSend={sendMessage}
      />
    </div>
  );
}
