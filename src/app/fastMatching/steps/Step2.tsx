import styles from "./step.module.css";
import Button from "@/app/_component/button/Button";
import { useEffect, useState } from "react";
import TopText from "../_component/TopText";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import Filter from "@/app/_component/filter/Filter";
import DurationBox from "@/app/_component/filter/DurationBox";

interface IStep2 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step2({ onNext, onBefore }: IStep2) {
  const router = useRouter();
  const { from } = useFromStore();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(200 / 3);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.Container}>
      <Navigation dark={false} isBack={true} onClick={onBefore}>
        스피드 매칭
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <TopText step={2} />
      <div className={styles.ContentsContainer}>
        <DurationBox />
        <div className={styles.ButtonContainer}>
          <Button onClick={onNext}>다음</Button>
        </div>
      </div>
    </div>
  );
}
