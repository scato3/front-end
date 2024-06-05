import React, { useEffect, useState } from "react";
import styles from "./noStudy.module.css";
import Image from "next/image";
import Icon from "../../../../public/icons/studyList/Mark_warning.svg";

interface NoStudyProps {
  children?: React.ReactNode;
  type?: "NoStudy" | "NoLogin";
}

export default function NoStudy({ children, type="NoStudy" }: NoStudyProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if(type === "NoStudy")
      setContent("직접 스터디를 등록해 보세요!");
    if(type === "NoLogin")
      setContent("로그인이 필요한 서비스예요.");
  }, []);

  return (
    <div className={styles.container}>
      <Image className={styles.icon} src={Icon} alt="noStudy" width={110} height={110} />
      {children && <p className={styles.contentTop}>{children}</p>}
      <p className={styles.contentBtm}>{content}</p>
    </div>
  );
}
