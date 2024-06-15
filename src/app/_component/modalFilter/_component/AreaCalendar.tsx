import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import styles from "./calendar.module.css";
import Image from "next/image";
import Btn_arrow_left from "../../../../../public/icons/Btn_arrow_left.svg";
import Btn_arrow_right from "../../../../../public/icons/Btn_arrow_right.svg";
import Button from "@/app/_component/button/Button";
import useFilterStore from "../store/useFilterStore";

type ButtonProperty = "disabled" | "confirm" | "default" | "pressed";

interface ICalendarProps {
  handleCloseModal: () => void;
}

export default function AreaCalendar({ handleCloseModal }: ICalendarProps) {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectDate, setSelectDate] = useState<string | null>(null);
  const { setSelectedDate } = useFilterStore();
  const [buttonProperty, setButtonProperty] = useState<ButtonProperty>("disabled");

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, "month"));
  };

  const handleDateClick = (date: string) => {
    if (moment(date).isSameOrAfter(moment(), "day")) {
      setSelectDate(date);
    }
  };

  const handleClickBtn = () => {
    setSelectedDate(selectDate);
    handleCloseModal();
  };

  useEffect(() => {
    if (selectDate && moment(selectDate).isSameOrAfter(moment(), "day")) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [selectDate]);

  const renderDaysOfWeek = () => {
    moment.locale("ko");
    const daysOfWeek = moment.weekdaysShort();
    return daysOfWeek.map((day) => (
      <div key={day} className={styles.day}>
        {day}
      </div>
    ));
  };

  const renderCalendarGrid = () => {
    const startOfMonth = moment(currentDate).startOf("month");
    const endOfMonth = moment(currentDate).endOf("month");
    const startOfFirstWeek = moment(startOfMonth).startOf("week");
    const endOfLastWeek = moment(endOfMonth).endOf("week");
    const calendar: JSX.Element[] = [];
    let currentDay = moment(startOfFirstWeek);

    while (currentDay.isSameOrBefore(endOfLastWeek)) {
      const week: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        const date = currentDay.format("YYYY-MM-DD");
        const isPastDate = currentDay.isBefore(moment(), "day");
        const isSelected = date === selectDate;
        week.push(
          <div
            key={date}
            className={`${styles.dayCell} ${isSelected ? styles.selectedDate : ""} ${isPastDate ? styles.disabledDate : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {currentDay.month() === currentDate.month() ? currentDay.format("D") : ""}
          </div>,
        );
        currentDay.add(1, "day");
      }
      calendar.push(
        <div key={currentDay.format("YYYY-MM-DD")} className={styles.calendarGrid}>
          {week}
        </div>,
      );
    }

    return calendar;
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <button className={styles.navigationButton} onClick={goToPreviousMonth}>
          <Image src={Btn_arrow_left} width={24} height={24} alt="왼쪽 버튼" />
        </button>
        <div className={styles.monthYear}>{currentDate.format("YYYY년 MM월")}</div>
        <button className={styles.navigationButton} onClick={goToNextMonth}>
          <Image src={Btn_arrow_right} width={24} height={24} alt="오른쪽 버튼" />
        </button>
      </div>
      <div className={styles.daysOfWeek}>{renderDaysOfWeek()}</div>
      {renderCalendarGrid()}
      <div className={styles.ButtonContainer}>
        <Button size="large_main" onClick={handleClickBtn} property={buttonProperty}>
          해당 날짜로 선택 완료
        </Button>
      </div>
    </div>
  );
}
