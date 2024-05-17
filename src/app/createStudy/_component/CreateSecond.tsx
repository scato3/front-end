"use client";

import { useEffect, useState } from "react";
import styles from "../createStudy.module.css";
import Navigation from "@/app/_component/navigation/page";
import Calendar from "./Calendar";
import Button from "@/app/_component/button/Button";
import { useModal } from "@/hooks/useModal";
import CreateModalContainer from "@/app/_component/createModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import CreateStore from "../store/CreateStore";
import moment from "moment";
import StudyDuration from "./StudyDuration";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Icon_minus from "../../../../public/icons/Icon_minus.svg";
import Icon_Plus from "../../../../public/icons/Icon_plus.svg";

export default function CreateSecond({ onNext }: { onNext: () => void }) {
  const router = useRouter();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const { selectedDate, selectedDuration, recruit, setRecruit, setSelectedDate, setSelectedDuration } = CreateStore();
  const formattedDate = selectedDate ? moment(selectedDate).format("YY.MM.DD") : "시작날짜 선택하기";

  const getFormattedDuration = (duration: string) => {
    switch (duration) {
      case "1w":
        return "일주일";
      case "1m":
        return "한달";
      case "3m":
        return "3개월";
      case "6m":
        return "6개월";
      default:
        return "미정";
    }
  };

  const formattedDuration = selectedDuration ? getFormattedDuration(selectedDuration) : "학습 기간 선택하기";

  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [recruitNum, setRecruitNum] = useState<number>(2);

  const [progress, setProgress] = useState<number>(25);
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");

  const increaseRecruit = () => {
    if (recruitNum < 20) {
      setRecruitNum((prevRecruit) => Math.min(prevRecruit + 1, 20));
      setRecruit(recruitNum);
    }
  };

  const decreaseRecruit = () => {
    if (recruitNum > 2) {
      setRecruitNum((prevRecruit) => Math.max(prevRecruit - 1, 2));
      setRecruit(recruitNum);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(50);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedDuration && selectedDate && recruit) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectedDuration, selectedDate, recruit]);

  const handleCalendar = () => {
    setSelectedModal("calendar");
    handleOpenModal();
  };

  const handleDuration = () => {
    setSelectedModal("duration");
    handleOpenModal();
  };

  const goBack = () => {
    setSelectedDate(null);
    setSelectedDuration(null);
    router.push("./home");
  };

  return (
    <div className={styles.Container}>
      <Navigation dark={false} isBack={true} onClick={goBack}>
        쇼터디 생성
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.Header}>쇼터디 진행기간과 모집 인원을 선택해 주세요</p>
        <p className={styles.studyTime}>학습 기간</p>
        <div className={styles.dateContainer}>
          <div className={`${styles.dateBox} ${selectedDate ? styles.selectedDateBox : ""}`} onClick={handleCalendar}>
            {formattedDate}
          </div>
          <p className={styles.dateTxt}>부터</p>
        </div>
        <div className={styles.dateContainer}>
          <div
            className={`${styles.dateBox} ${selectedDuration ? styles.selectedDateBox : ""}`}
            onClick={handleDuration}
          >
            {formattedDuration}
          </div>
          <p className={styles.dateTxt}>까지 공부할래요</p>
        </div>
        <div className={styles.recruitedContainer}>
          <p className={styles.recruited}>모집인원</p>
          <p className={styles.included}>*본인포함</p>
        </div>

        <p className={styles.recrutiedInfo}>나를 포함해 최대 20명까지 함께할 수 있어요</p>
        <div className={styles.recruitContainer}>
          <Image
            src={Icon_minus}
            width={36}
            height={36}
            alt="마이너스 이미지"
            className={styles.recruitImg}
            onClick={decreaseRecruit}
          />
          <p className={styles.recruit}>{recruitNum}</p>
          <Image
            src={Icon_Plus}
            width={36}
            height={36}
            alt="플러스 이미지"
            className={styles.recruitPlusImg}
            onClick={increaseRecruit}
          />
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <Button size="large_main" onClick={onNext} property={buttonProperty}>
          Step 2 완료
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <CreateModalContainer handleCloseModal={handleCloseModal}>
            {selectedModal === "calendar" ? (
              <Calendar handleCloseModal={handleCloseModal} />
            ) : (
              <StudyDuration handleCloseModal={handleCloseModal} />
            )}
          </CreateModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
