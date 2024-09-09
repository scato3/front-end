import styles from "./step.module.css";
import Button from "@/app/_component/button/Button";
import { useEffect, useState } from "react";
import TopText from "../_component/TopText";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import Icon_check from "../../../../public/icons/fastMatching/check.svg";
import Image from "next/image";

interface ILastPage {
  onBefore: () => void;
}

export default function LastPage({ onBefore }: ILastPage) {
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
        <div className={styles.LastImageBox}>
          <Image src={Icon_check} width={21.05} height={15.53} alt={"check"} />
        </div>
      </div>
      <div className={styles.LastTopTextContainer}>
        <p className={styles.LastTopP}>나에게 적합한 스터디들이에요.</p>
        <p className={styles.LastBottomP}>옆으로 넘겨 추천 스터디를 확인하고, 원하는 스터디에 바로 입장해볼까요?</p>
      </div>
      <div className={styles.ContentsContainer}>
        <Button>이 스터디 가입하기</Button>
      </div>
      <p className={styles.LastTextButton}>직접 스터디 찾기</p>
    </div>
  );
}
