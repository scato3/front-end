import styles from "./studquickbtn.module.css";
import Icon_quickActive from "../../../../public/icons/studyList/Icon_quickActive.svg";
import Image from "next/image";

export default function StudyQuickBtn() {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image className={styles.quickIcon} src={Icon_quickActive} width={20} height={20} alt="quick" />
        빠른매칭
      </div>
    </div>
  );
}
