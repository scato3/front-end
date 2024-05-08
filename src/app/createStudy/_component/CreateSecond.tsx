"use client";

import { useEffect, useState } from "react";
import styles from "../createStudy.module.css";
import Navigation from "@/app/_component/navigation/page";

export default function CreateSecond({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50);
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
      <button onClick={onNext}></button>
    </div>
  );
}
