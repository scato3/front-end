import styles from "./quickBtn.module.css";
import Icon_quick from "../../../../public/icons/studyList/Icon_quick.svg";
import Icon_quickActive from "../../../../public/icons/studyList/Icon_quickActive.svg";
import resetIcon from "../../../../public/icons/studyList/Icon_reset.svg";
import Image from "next/image";
import useSearchResultStore from "../store/useSearchResultStore";
import { useEffect } from "react";

export default function QuickMatchBtn({isQuick}:{isQuick?:boolean}) {
  const { quickMatch, setQuickMatch } = useSearchResultStore();

  const handleQuickMatch = () => {
    setQuickMatch(!quickMatch);
  };

  return (
    <div className={styles.container}>
      {quickMatch && (
        <button className={styles.resetBtn} onClick={() => setQuickMatch(false)}>
          <Image src={resetIcon} width={20} height={20} alt="reset" />
        </button>
      )}
      <button
        className={quickMatch || isQuick ? `${styles.quickMatchBtn} ${styles.quickMatchBtnActive}` : styles.quickMatchBtn}
        onClick={handleQuickMatch}
      >
        <Image
          className={styles.quickIcon}
          src={quickMatch || isQuick ? Icon_quickActive : Icon_quick}
          width={20}
          height={20}
          alt="quick"
        />
        빠른매칭
      </button>
    </div>
  );
}
