import styles from "./speedMatching.module.css";
import Icon_bolt from "../../../../public/icons/home/Icon_bolt.svg";
import Image from "next/image";

export default function SpeedMatchingBtn() {
  return (
    <div className={styles.Container}>
      <p className={styles.TopText}>나에게 맞는 쇼터디를 빠르게 알아봐요!</p>
      <div className={styles.Bottom}>
        <Image src={Icon_bolt} width={27} height={27} alt="icon_bolt" />
        <p>스피드 매칭</p>
      </div>
    </div>
  );
}
