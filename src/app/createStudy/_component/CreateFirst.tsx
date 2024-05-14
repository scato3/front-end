"use client";

import { useEffect, useState } from "react";
import styles from "../createStudy.module.css";
import Navigation from "@/app/_component/navigation/page";
import CheckField from "./CheckField";

export default function CreateFirst({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(25);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.Container}>
      <Navigation dark={false} isBack={true} onClick={() => {}}>
        쇼터디 생성
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.Header}>함께 공부하고 싶은 분야를 선택해 주세요</p>
      </div>
      <CheckField onNext={onNext} />
    </div>
  );
}
