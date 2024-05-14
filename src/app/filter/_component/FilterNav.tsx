import styles from "./nav.module.css";
import Icon_close from "../../../../public/icons/Icon_close.svg";
import Image from "next/image";

export default function FilterNav() {
  return (
    <div className={styles.FilterContainer}>
      <p>상세 필터</p>
      <Image src={Icon_close} width={30} height={30} alt="종료 버튼" />
    </div>
  );
}
