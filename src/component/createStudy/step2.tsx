import { useState, useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import styles from './step.module.scss';
import Button from '../common/button';
import TopText from './topText';
import Navigation from '../common/navigation';
import Calendar from '../common/calendar';
import { formateYearDate } from '@/utils/dateformat';
import BottomSheet from '../common/bottomSheet';
import { durationOption } from '@/data/durationData';
import {
  IconBlackAdd,
  IconDisabledAdd,
  IconMinus,
  IconDisabledMinus,
} from '../../../public/icons';
import Image from 'next/image';

interface IStep2 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step1({ onNext, onBefore }: IStep2) {
  const [progress, setProgress] = useState<number>(25);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [canIncrement, setCanIncrement] = useState<boolean>(true);
  const [canDecrement, setCanDecrement] = useState<boolean>(true);

  const { control, setValue } = useFormContext();

  const [startDate, duration, max_participants_num] = useWatch({
    control,
    name: ['startDate', 'duration', 'max_participants_num'],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(200 / 4);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCanIncrement(max_participants_num < 20);
    setCanDecrement(max_participants_num > 2);
  }, [max_participants_num]);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  function getDurationLabel(key: string) {
    const option = durationOption.find((opt) => opt.key === key);
    return option ? option.label : '학습 기간 선택하기';
  }

  const handleIncrement = () => {
    if (max_participants_num < 20) {
      setValue('max_participants_num', max_participants_num + 1);
    }
  };

  const handleDecrement = () => {
    if (max_participants_num > 2) {
      setValue('max_participants_num', max_participants_num - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 2 && value <= 20) {
      setValue('max_participants_num', value);
    }
  };

  return (
    <div className={styles.Container}>
      <Navigation title="쇼터디 생성" onClick={onBefore} />
      <div className={styles.seperator}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <TopText step={2} />

      <div className={styles.section}>
        <h2 className={styles.durationHeader}>학습기간</h2>
        <div className={styles.durationContainer}>
          <div className={styles.DateContainer}>
            <div
              className={`${styles.duration} ${startDate ? styles.active : ''}`}
              onClick={() => {
                handleOpenCalendar();
              }}
            >
              {startDate ? formateYearDate(startDate) : '시작 날짜 선택하기'}
            </div>
            <p>부터</p>
          </div>
          <div className={styles.DateContainer}>
            <div
              className={`${styles.duration} ${duration ? styles.active : ''}`}
              onClick={() => {
                handleOpenBottomSheet();
              }}
            >
              {duration ? getDurationLabel(duration) : '학습 기간 선택하기'}
            </div>
            <p>동안 공부할래요</p>
          </div>
        </div>
        <h2 className={styles.participantHeader}>모집인원</h2>
        <p className={styles.participantDesc}>
          본인 포함 최대 20명까지 함께할 수 있어요.
        </p>
        <div className={styles.participantContainer}>
          <div
            className={`${styles.addContainer} ${canDecrement ? '' : styles.cant}`}
            onClick={handleDecrement}
          >
            <Image
              src={canDecrement ? IconMinus : IconDisabledMinus}
              alt="빼기"
            />
          </div>
          <input
            type="number"
            value={max_participants_num}
            onChange={handleInputChange}
            className={styles.participantInput}
            max={20}
          />
          <div
            className={`${styles.addContainer} ${canIncrement ? '' : styles.cant}`}
            onClick={handleIncrement}
          >
            <Image
              src={canIncrement ? IconBlackAdd : IconDisabledAdd}
              alt="더하기"
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={onNext}
          disabled={!startDate || !duration || !max_participants_num}
        >
          다음
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
      <Calendar isOpen={isCalendarOpen} onClose={handleCloseCalendar} />
    </div>
  );
}
