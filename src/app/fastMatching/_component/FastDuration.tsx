import styles from "./duration.module.css";
import { useState, useEffect } from "react";
import Button from "@/app/_component/button/Button";
import useFastStore from "../store/FastStore";
import { ICloseModalProps } from "@/app/type/closeModalType";

export default function StudyDuration({ handleCloseModal }: ICloseModalProps) {
  const durations = ["미정", "일주일", "한달", "3개월", "6개월"];

  const { setSelectedDuration } = useFastStore();
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [lastItemIndex, setLastItemIndex] = useState(durations.length - 1);

  useEffect(() => {
    setLastItemIndex(durations.length - 1);
  }, [durations]);

  const handleDurationClick = (duration: string) => {
    setSelectedItem(duration);
  };

  const handleClickBtn = () => {
    let durationCode = "";
    switch (selectedItem) {
      case "일주일":
        durationCode = "1w";
        break;
      case "한달":
        durationCode = "1m";
        break;
      case "3개월":
        durationCode = "3m";
        break;
      case "6개월":
        durationCode = "6m";
        break;
      case "미정":
        durationCode = "미정";
        break;
    }

    setSelectedDuration(durationCode);
    handleCloseModal();
  };

  useEffect(() => {
    setButtonProperty(selectedItem ? "confirm" : "disabled");
  }, [selectedItem]);

  return (
    <div className={styles.DurationContainer}>
      {durations.map((duration, index) => (
        <div
          key={index}
          className={`${styles.DurationItem} ${index === lastItemIndex ? styles.LastItem : ""} ${duration === selectedItem ? styles.Selected : ""}`}
          onClick={() => handleDurationClick(duration)}
        >
          {duration}
        </div>
      ))}

      <div className={styles.ButtonContainer}>
        <Button size="large_main" onClick={handleClickBtn} property={buttonProperty}>
          {buttonProperty === "confirm" ? `해당 기간으로 선택 완료` : `쇼터디 기간을 선택해 주세요`}
        </Button>
      </div>
    </div>
  );
}
