"use client";

import { useModal } from "@/hooks/useModal";
import CreateModalContainer from "@/app/_component/createModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import useFilterStore from "../store/useFilterStore";
import styles from "./content.module.css";
import moment from "moment";
import { useState } from "react";
import AreaCalendar from "./AreaCalendar";
import AreaDuration from "./AreaDuration";

interface DurationProps {
  DurationRef: React.RefObject<HTMLDivElement>;
}

export default function Duration({ DurationRef }: DurationProps) {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const { selectedDate, selectedDuration } = useFilterStore();
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
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

  const handleCalendar = () => {
    setSelectedModal("calendar");
    handleOpenModal();
  };

  const handleDuration = () => {
    setSelectedModal("duration");
    handleOpenModal();
  };

  return (
    <div className={styles.Container} ref={DurationRef}>
      <div className={styles.Header}>기간</div>
      <div className={styles.dateContainer}>
        <div className={`${styles.dateBox} ${selectedDate ? styles.selectedDateBox : ""}`} onClick={handleCalendar}>
          {formattedDate}
        </div>
      </div>
      <div className={styles.dateContainer}>
        <div className={`${styles.dateBox} ${selectedDuration ? styles.selectedDateBox : ""}`} onClick={handleDuration}>
          {formattedDuration}
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <CreateModalContainer handleCloseModal={handleCloseModal}>
            {selectedModal === "calendar" ? (
              <AreaCalendar handleCloseModal={handleCloseModal} />
            ) : (
              <AreaDuration handleCloseModal={handleCloseModal} />
            )}
          </CreateModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
