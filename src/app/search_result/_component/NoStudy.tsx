import React from "react";
import styles from "./noStudy.module.css";
import Image from "next/image";
import Icon from "../../../../public/icons/studyList/Mark_warning.svg";

interface NoStudyProps {
  children?: React.ReactNode;
}

export default function NoStudy({ children }: NoStudyProps) {
  return (
    <div className={styles.container}>
      <Image className={styles.icon} src={Icon} alt="noStudy" width={110} height={110} />
      {children && <p className={styles.contentTop}>{children}</p>}
      <p className={styles.contentBtm}>직접 스터디를 등록해 보세요!</p>
    </div>
  );
}
