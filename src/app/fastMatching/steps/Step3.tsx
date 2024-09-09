import styles from "./step.module.css";
import Button from "@/app/_component/button/Button";
import { useEffect, useState } from "react";
import TopText from "../_component/TopText";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import TendencyBox from "@/app/_component/filter/TendencyBox";
import MemberScopeBox from "@/app/_component/filter/MemberScopeBox";
import Icon_checkbox from "../../../../public/icons/fastMatching/UnCheckedCheckbox.svg";
import Icon_checkbox_check from "../../../../public/icons/fastMatching/CheckedCheckbox.svg";
import Image from "next/image";

interface IStep3 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step3({ onNext, onBefore }: IStep3) {
  const router = useRouter();
  const { from } = useFromStore();
  const [progress, setProgress] = useState<number>(0);
  const [isRemember, setIsRemember] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
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
      <TopText step={3} />
      <div className={styles.ContentsContainer}>
        <div>
          <p>나의 학습 성향은?</p>
          <TendencyBox />
          <p>선호 인원은?</p>
          <MemberScopeBox />
        </div>
      </div>
      <div className={styles.RememberContainer}>
        <p className={styles.RememberP}>다음에도 이 조건을 기억할게요</p>
        {isRemember ? (
          <Image
            src={Icon_checkbox_check}
            width={32}
            height={32}
            alt={"checkbox"}
            onClick={() => {
              setIsRemember(!isRemember);
            }}
          />
        ) : (
          <div
            className={styles.CheckBox}
            onClick={() => {
              setIsRemember(!isRemember);
            }}
          ></div>
        )}
      </div>
      <div className={styles.ButtonContainer}>
        <Button onClick={onNext}>다음</Button>
      </div>
    </div>
  );
}
