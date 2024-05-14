import styles from "./noStudy.module.css";
import Image from "next/image";
import Icon from "../../../../public/icons/studyList/Mark_warning.svg";

export default function NoStudy() {
  return (
    <div className={styles.container}>
      <Image className={styles.icon} src={Icon} alt="noStudy" width={110} height={110} />
      <p className={styles.contentTop}>모집중인 쇼터디가 없어요</p>
      <p className={styles.contentBtm}>직접 스터디를 등록해 보세요!</p>
    </div>
  );
}
