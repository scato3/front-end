'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/ko';
import styles from './calendar.module.scss';
import Image from 'next/image';
import { RightActive, LeftActive } from '../../../public/arrow';
import { useWatch, useFormContext } from 'react-hook-form';

dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);
dayjs.locale('ko');

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Calendar({ isOpen, onClose }: CalendarProps) {
  const { setValue, control } = useFormContext();
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startDate = useWatch({
    control,
    name: 'startDate',
  });

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => dayjs(prevDate).subtract(1, 'month'));
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => dayjs(prevDate).add(1, 'month'));
  };

  const handleDateClick = (date: string) => {
    if (dayjs(date).isSameOrAfter(dayjs(), 'day')) {
      setValue('startDate', date);
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = dayjs.weekdaysShort();
    return daysOfWeek.map((day) => (
      <div key={day} className={styles.day}>
        {day}
      </div>
    ));
  };

  const renderCalendarGrid = () => {
    const startOfMonth = dayjs(currentDate).startOf('month');
    const endOfMonth = dayjs(currentDate).endOf('month');
    const startOfFirstWeek = dayjs(startOfMonth).startOf('week');
    const endOfLastWeek = dayjs(endOfMonth).endOf('week');
    const calendar: JSX.Element[] = [];
    const today = dayjs().format('YYYY-MM-DD');
    let currentDay = dayjs(startOfFirstWeek);

    while (currentDay.isSameOrBefore(endOfLastWeek)) {
      const week: JSX.Element[] = [];
      for (let i = 0; i < 7; i++) {
        const date = currentDay.format('YYYY-MM-DD');
        const isPastDate = currentDay.isBefore(dayjs(), 'day');
        const isSelected = date === startDate;
        const isToday = date === today;

        week.push(
          <div
            key={date}
            className={`${styles.dayCell} 
            ${isSelected ? styles.selectedDate : ''} 
            ${isPastDate ? styles.disabledDate : ''} 
            ${isToday ? styles.today : ''} 
            ${isToday && isSelected ? styles.selectedToday : ''}`}
            onClick={() => handleDateClick(date)}
          >
            {currentDay.month() === currentDate.month()
              ? currentDay.format('D')
              : ''}
            {isToday && <div className={styles.todayMent}>오늘</div>}
          </div>
        );
        currentDay = currentDay.add(1, 'day');
      }
      calendar.push(
        <div
          key={currentDay.format('YYYY-MM-DD')}
          className={styles.calendarGrid}
        >
          {week}
        </div>
      );
    }

    return calendar;
  };

  return (
    <div
      className={`${styles.overLay} ${isOpen ? styles.open : styles.closed}`}
      onClick={onClose}
    >
      <div
        className={`${styles.bottomSheet} ${isOpen ? styles.open : styles.closed}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.calendarContainer}>
          <div className={styles.header}>
            <button
              className={styles.navigationButton}
              onClick={goToPreviousMonth}
            >
              <Image src={LeftActive} width={26} height={26} alt="왼쪽 버튼" />
            </button>
            <div className={styles.monthYear}>
              {currentDate.format('YYYY년 MM월')}
            </div>
            <button className={styles.navigationButton} onClick={goToNextMonth}>
              <Image
                src={RightActive}
                width={26}
                height={26}
                alt="오른쪽 버튼"
              />
            </button>
          </div>
          <div className={styles.daysOfWeek}>{renderDaysOfWeek()}</div>
          {renderCalendarGrid()}
        </div>
      </div>
    </div>
  );
}
