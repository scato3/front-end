import styles from "../createStudy.module.css";
import Navigation from "@/app/_component/navigation/page";
import Button from "@/app/_component/button/Button";
import { useState, useEffect } from "react";

import Icon_avaliable from "../../../../public/icons/Icon_available.svg";
import Icon_avaliable_active from "../../../../public/icons/Icon_avaliable_active.svg";
import Image from "next/image";
import useCreateStore from "../store/CreateStore";

export default function CreateThird({ onNext }: { onNext: () => void }) {
  const [progress, setProgress] = useState<number>(50);
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedApplyContainer, setSelectedApplyContainer] = useState<string | null>("");
  const { setTendency, setMatchingType } = useCreateStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedApplyContainer && selectedPurpose) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectedApplyContainer, selectedPurpose]);

  const handlePurposeSelect = (purpose: string) => {
    setSelectedPurpose(purpose);
  };

  const handleApplyContainerSelect = (apply: string) => {
    setSelectedApplyContainer(apply);
  };

  const handleNext = () => {
    let tendencyValue = "";
    let matchingTypeValue = "";

    if (selectedPurpose === "활발한 대화와 동기부여 원해요") {
      tendencyValue = "active";
    } else if (selectedPurpose === "학습 피드백을 주고 받고 싶어요") {
      tendencyValue = "feedback";
    } else if (selectedPurpose === "조용히 집중하고 싶어요") {
      tendencyValue = "focus";
    }

    if (selectedApplyContainer === "빠른 매칭") {
      matchingTypeValue = "quick";
    } else if (selectedApplyContainer === "승인") {
      matchingTypeValue = "approval";
    }

    setTendency(tendencyValue);
    setMatchingType(matchingTypeValue);

    onNext();
  };

  return (
    <div className={styles.Container}>
      <Navigation dark={false} isBack={true} onClick={() => {}}>
        쇼터디 생성
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.Header}>스터디 목적과 신청 방식을 선택해 주세요</p>
        <p className={styles.Header}>목적</p>
        <div
          className={`${styles.purpose} ${selectedPurpose === "활발한 대화와 동기부여 원해요" ? styles.selected : ""}`}
          onClick={() => handlePurposeSelect("활발한 대화와 동기부여 원해요")}
        >
          활발한 대화와 동기부여 원해요
        </div>
        <div
          className={`${styles.purpose} ${selectedPurpose === "학습 피드백을 주고 받고 싶어요" ? styles.selected : ""}`}
          onClick={() => handlePurposeSelect("학습 피드백을 주고 받고 싶어요")}
        >
          학습 피드백을 주고 받고 싶어요
        </div>
        <div
          className={`${styles.purpose} ${selectedPurpose === "조용히 집중하고 싶어요" ? styles.selected : ""}`}
          onClick={() => handlePurposeSelect("조용히 집중하고 싶어요")}
        >
          조용히 집중하고 싶어요
        </div>
        <p className={styles.Header}>신청 방식</p>
        <div
          className={`${styles.applyContainer} ${selectedApplyContainer === "빠른 매칭" && styles.selected}`}
          onClick={() => handleApplyContainerSelect("빠른 매칭")}
        >
          <p className={styles.applyHeader}>빠른 매칭</p>
          <p>모든 회원의 신청을 자동으로 수락해요</p>
          <Image
            src={selectedApplyContainer === "빠른 매칭" ? Icon_avaliable_active : Icon_avaliable}
            width={48}
            height={48}
            alt="체크 버튼"
            className={styles.applyIcon}
          />
        </div>
        <div
          className={`${styles.applyContainer} ${selectedApplyContainer === "승인" && styles.selected}`}
          onClick={() => handleApplyContainerSelect("승인")}
        >
          <p className={styles.applyHeader}>승인</p>
          <p>직접 회원을 수락 또는 거절할 수 있어요</p>
          <Image
            src={selectedApplyContainer === "승인" ? Icon_avaliable_active : Icon_avaliable}
            width={48}
            height={48}
            alt="체크 버튼"
            className={styles.applyIcon}
          />
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <Button size="large_main" property={buttonProperty} onClick={handleNext}>
          Step 3 완료
        </Button>
      </div>
    </div>
  );
}
