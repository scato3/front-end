import React from "react";
import styles from "./noMember.module.css";
import Image from "next/image";
import Icon from "../../../../../public/icons/studyList/Mark_warning.svg";

interface NoStudyProps {
  children?: React.ReactNode;
}

export default function NoMember({ children }: NoStudyProps) {
  return (
    <div className={styles.container}>
      <Image className={styles.icon} src={Icon} alt="noStudy" width={110} height={110} />
      {children && <p className={styles.contentTop}>{children}</p>}
      <p className={styles.contentBtm}>태그 변경을 통해 쇼터디를 홍보해보세요!</p>
    </div>
  );
}
