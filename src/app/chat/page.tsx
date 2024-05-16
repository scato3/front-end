"use client";
import useAuth from "@/hooks/useAuth";
import { IChat } from "@/interfaces/chat/IChat";
import { IMessage } from "@/interfaces/chat/IMessage";
import { Box, Button, FormControl, Input, InputGroup, InputRightElement, Spinner, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Back from "../../../public/icons/Btn_arrow_left.svg";
import Plus from "../../../public/icons/Icon_chat_plus.svg";
import Arrow from "../../../public/icons/Icon_down_arrow.svg";
import More from "../../../public/icons/Icon_more.svg";
import Noti from "../../../public/icons/Icon_noti.svg";
import Search from "../../../public/icons/Icon_search.svg";
import { useSocket } from "../_component/SocketProvider";
import chat from "../api/chat/chat";
import getMessage from "../api/chat/getMessage";
import postMessage from "../api/chat/postMessage";
import ChatBox from "./_component/chatBox";
import styles from "./chat.module.css";

export default function ChatPage() {
  interface IChatData extends IChat {
    chatName: string;
  }

  const { socket, isConnected, typing, isTyping, setIsConnected, setIsTyping, setTyping } = useSocket();

  const toast = useToast();
  const [chatData, setChatData] = useState<IChatData | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");

  const searchParams = useSearchParams();
  const studyId = searchParams.get("studyId") as string;

  useEffect(() => {
    if (socket) {
      socket?.emit("setup", "setuptest");
      socket?.emit("test", "data");
    }
  }, [socket]);
  const { accessToken, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatData] = await Promise.all([chat(studyId, accessToken)]);
        if (chatData) {
          setChatData(chatData);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message received", (newMessageReceived: IMessage) => {
        setMessages([...messages, newMessageReceived]);
      });
    }
  });

  const sendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage) {
      if (socket) socket.emit("stop typing", chatData?._id);
      if (e.nativeEvent.isComposing) return;
      try {
        setNewMessage("");
        const data = await postMessage(
          {
            content: newMessage,
            chatId: chatData?._id,
          },
          accessToken,
        );
        if (socket) socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "메시지 발송 실패",
          description: "메시지 전송에 실패했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessage(chatData?._id, accessToken);
      setMessages(data);
      setLoading(false);
      if (socket) socket.emit("join chat", chatData?._id);
    } catch (error) {
      console.log(error);
      toast({
        title: "메시지 조회 실패",
        description: "메시지 조회에 실패했습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isConnected) return;

    if (!typing) {
      setTyping(true);
      if (socket) socket.emit("typing", chatData?._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        if (socket) socket.emit("stop typing", chatData?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (chatData) fetchMessages();
  }, [chatData]);
  const messageBoxRef = useRef<HTMLUListElement>();
  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.navBox}>
        <Image className={styles.searchIcon} src={Back} alt="검색 버튼" width={36} height={36} />
        <div className={styles.studyName}>{chatData?.chatName}</div>
        <div>
          <Image className={styles.searchIcon} src={Search} alt="검색 버튼" width={36} height={36} />
          <Image className={styles.alertIcon} src={More} alt="검색 버튼" width={36} height={36} />
        </div>
      </div>
      <div className={styles.topNotification}>
        <div className={styles.topNotificationLeft}>
          <Image className={styles.notiIcon} src={Noti} alt="공지 버튼" width={32} height={32} />
          공지사항_꼭 확인해주세요
        </div>
        <Image className={styles.alertIcon} src={Arrow} alt="공지 버튼" width={16} height={16} />
      </div>
      {loading ? (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
          <Spinner size="xl" w={100} h={100} alignSelf="center" margin="auto" />
        </div>
      ) : (
        <div className={styles.messageBox} ref={messageBoxRef}>
          {<ChatBox messages={messages} userId={user?.userObjectId as string} />}
        </div>
      )}

      <div className={styles.inputBox}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={3}
          bg="#413f3f"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflowY="hidden"
          className={styles.inputBox}
        >
          <Image alt="업로드 이미지" src={Plus}></Image>

          <FormControl onKeyDown={sendMessage} isRequired mt={3} id="first-name">
            <InputGroup size="small">
              <Input
                variant="filled"
                bg="#f2f2f2"
                placeholder="채팅으로 모두와 함께 대화해보세요"
                value={newMessage}
                onChange={typingHandler}
                className={styles.input}
                _placeholder={{ color: "#a7a5a4" }}
              />
              <InputRightElement width="4rem" height={"44px"}>
                <Button
                  h="40px"
                  w="65px"
                  color={"black"}
                  backgroundColor={"#ff6414"}
                  border={"none"}
                  position={"relative"}
                  left={0}
                >
                  전송
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
