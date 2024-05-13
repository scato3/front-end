import Image from "next/image";
import Icon_close from "../../../../public/icons/Icon_close.svg";
import styles from "./nav.module.css";

export default function ProfileNav({ title }: { title: string }) {
  return (
    <div className={styles.FilterContainer}>
      <p>{title}</p>
      <Image src={Icon_close} width={30} height={30} alt="종료 버튼" />
    </div>
  );
}
