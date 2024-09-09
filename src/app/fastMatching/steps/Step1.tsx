import styles from "./step.module.css";
import Button from "@/app/_component/button/Button";
import ButtonBox from "@/app/_component/main_home/ButtonBox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TopText from "../_component/TopText";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";

interface IStep1 {
  onNext: () => void;
}

export default function Step1({ onNext }: IStep1) {
  const router = useRouter();
  const { from } = useFromStore();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100 / 3);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.Container}>
      <Navigation
        dark={false}
        isBack={true}
        onClick={() => {
          router.push(`./${from}`);
        }}
      >
        스피드 매칭
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <TopText step={1} />
      <div className={styles.ContentsContainer}>
        <ButtonBox swiper={false}></ButtonBox>
        <Button onClick={onNext}>다음</Button>
      </div>
    </div>
  );
}
