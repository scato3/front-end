"use client";
import Image from "next/image";
import { useEffect } from "react";
import Back from "../../../public/icons/Btn_arrow_left.svg";
import Arrow from "../../../public/icons/Icon_down_arrow.svg";
import More from "../../../public/icons/Icon_more.svg";
import Noti from "../../../public/icons/Icon_noti.svg";
import Search from "../../../public/icons/Icon_search.svg";
import { useSocket } from "../_component/SocketProvider";
import styles from "./chat.module.css";

export default function ChatPage() {
  const { socket, isConnected } = useSocket();
  console.log(socket);
  useEffect(() => {
    if (socket) {
      socket?.emit("setup", "setuptest");
      socket?.emit("test", "data");
    }
  }, [socket]);
  return (
    <div className={styles.chatWrapper}>
      <div className={styles.navBox}>
        <Image className={styles.searchIcon} src={Back} alt="검색 버튼" width={36} height={36} />
        <div className={styles.studyName}>스터디명</div>
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
      <div className={styles.dateBox}></div>
    </div>
  );
}
