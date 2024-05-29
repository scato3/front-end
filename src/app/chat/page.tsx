"use client";
import useAuth from "@/hooks/useAuth";
import { useModal } from "@/hooks/useModal";
import { IChat } from "@/interfaces/chat/IChat";
import { IJoinDate } from "@/interfaces/chat/IJoinDate";
import { IMessage } from "@/interfaces/chat/IMessage";
import { IUser } from "@/interfaces/chat/IUser";
import useFromStore from "@/utils/from";
import animationData from "@/utils/typing.json";
import { Box, Button, FormControl, Input, InputGroup, InputRightElement, Spinner, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import io, { Socket } from "socket.io-client";
import Back from "../../../public/icons/Btn_arrow_left.svg";
import Plus from "../../../public/icons/Icon_chat_plus.svg";
import Arrow from "../../../public/icons/Icon_down_arrow.svg";
import More from "../../../public/icons/Icon_more.svg";
import Noti from "../../../public/icons/Icon_noti.svg";
import Search from "../../../public/icons/Icon_search.svg";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import addJoinToGroup from "../api/chat/addJoinToGroup";
import getMessage from "../api/chat/getMessage";
import postMessage from "../api/chat/postMessage";
import Submenu from "./_component/SubMenu";
import ChatBox from "./_component/chatBox";
import styles from "./chat.module.css";

export default function ChatPage() {
  interface IChatData extends IChat {
    chatName: string;
    joinDates: IJoinDate[];
  }

  interface IJoinData extends IJoinDate {
    userInfo: IUser;
  }
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const toast = useToast();
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [chatData, setChatData] = useState<IChatData | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>("");
  const [joinDate, setJoinDate] = useState<IJoinData[]>([]);

  const searchParams = useSearchParams();
  const studyId = searchParams.get("studyId") as string;
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [socket, setSocket] = useState<null | Socket>(null);
  const { from } = useFromStore();
  const router = useRouter();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const toggleNotice = () => {
    setShowNotice((prevState) => !prevState);
  };

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_PROD_API as string);
    newSocket.emit("setup", user);
    newSocket.on("connected", () => setSocketConnected(true));
    newSocket.on("typing", () => setIsTyping(true));
    newSocket.on("stop typing", () => setIsTyping(false));
    newSocket.on("error", (error: unknown) => {
      console.log("Socket connection error:", error);
    });
    newSocket.on("user joined", (data) => {
      if (data?.joinDates.length > 0) {
        setJoinDate(
          data?.joinDates.map((date: IJoinDate, idx: number) => {
            return { userInfo: data.users[idx], ...date };
          }),
        );
      }
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const { accessToken, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (accessToken) {
          const chatData = await addJoinToGroup(studyId, accessToken);
          setChatData(chatData);

          if (chatData?.joinDates.length > 0) {
            setJoinDate(
              chatData?.joinDates.map((date: IJoinDate, idx: number) => {
                return { userInfo: chatData.users[idx], ...date };
              }),
            );
          }
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "데이터 불러오기 실패",
          description: "데이터를 불러오는 중 오류가 발생했습니다.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
    fetchData();
  }, [accessToken, studyId]);

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
      if (socket && chatData) {
        socket.emit("join chat", chatData);
      }
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
    if (!socketConnected) return;

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

  const messageBoxRef = useRef<HTMLDivElement>(null);
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
        <Image
          className={styles.searchIcon}
          src={Back}
          alt="검색 버튼"
          width={36}
          height={36}
          onClick={() => {
            router.push(`./${from}`);
          }}
        />
        <div className={styles.studyName}>{chatData?.chatName}</div>
        <div>
          <Image className={styles.searchIcon} src={Search} alt="검색 버튼" width={36} height={36} />
          <Image
            className={styles.alertIcon}
            src={More}
            alt="검색 버튼"
            width={36}
            height={36}
            onClick={() => {
              handleOpenModal();
            }}
          />
        </div>
      </div>
      <div className={styles.topNotification}>
        <div className={styles.topNotificationLeft}>
          <Image className={styles.notiIcon} src={Noti} alt="공지 버튼" width={32} height={32} />
          공지사항_꼭 확인해주세요
        </div>
        <Image
          className={styles.alertIcon}
          src={Arrow}
          alt="공지 버튼"
          width={16}
          height={16}
          onClick={() => {
            toggleNotice();
          }}
          style={{ transform: `rotate(${showNotice ? "180deg" : "0deg"})`, transition: "transform 0.3s ease" }}
        />
        {showNotice && (
          <div className={styles.noticeContent}>
            모두가 의욕을 가지고 쇼터디 참가를 해주신 만큼, 서로에게 미치는 영향이 있습니다. 모두에게 힘이되는 쇼터디를
            유지하기 위함이니, 일주일에 3회이상 참여 부탁드립니다.
          </div>
        )}
      </div>
      {loading ? (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center" }}>
          <Spinner size="xl" w={100} h={100} alignSelf="center" margin="auto" />
        </div>
      ) : (
        <div className={styles.messageBox} ref={messageBoxRef}>
          {<ChatBox messages={messages} userId={user?.userObjectId as string} joinDates={joinDate} />}
          {isTyping ? (
            <div>
              <Lottie options={defaultOptions} height={50} width={70} style={{ marginBottom: 15, marginLeft: 0 }} />
            </div>
          ) : (
            <></>
          )}
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
          <div className={styles.UploadContainer}>
            <Image alt="업로드 이미지" src={Plus} width={24} height={24}></Image>
          </div>

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
                paddingLeft="16px"
                height="38.5px"
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
      {openModal && (
        <div className={styles.Test}>
          <ModalPortal>
            <ModalContainer>
              <Submenu handleCloseModal={handleCloseModal}></Submenu>
            </ModalContainer>
          </ModalPortal>
        </div>
      )}
    </div>
  );
}
