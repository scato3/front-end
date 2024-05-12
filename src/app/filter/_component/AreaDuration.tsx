import styles from "./calendar.module.css";
import useFilterStore from "../store/useFilterStore";
import Button from "@/app/_component/button/Button";
import { useEffect, useState } from "react";

interface IStudyDurationProps {
  handleCloseModal: () => void;
}

type ButtonProperty = "disabled" | "confirm" | "default" | "pressed";

export default function AreaDuration({ handleCloseModal }: IStudyDurationProps) {
  const durations = ["미정", "일주일", "한달", "3개월", "6개월"];

  const { setSelectedDuration } = useFilterStore();
  const [buttonProperty, setButtonProperty] = useState<ButtonProperty>("disabled");
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
        durationCode = "";
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
