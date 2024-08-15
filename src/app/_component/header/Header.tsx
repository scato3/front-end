import styles from "./header.module.css";
import Image from "next/image";
import Icon_alert from "../../../../public/icons//header/Icon_notifications.svg";

export default function Header() {
  return (
    <div className={styles.Container}>
      <p className={styles.Title}>SHOWTUDY</p>
      <Image className={styles.iconBell} src={Icon_alert} width={33} height={33} alt="bell" />
    </div>
  );
}
