import styles from "./header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <div className={styles.Container}>
      <p className={styles.Title}>SHOWTUDY</p>
    </div>
  );
}
