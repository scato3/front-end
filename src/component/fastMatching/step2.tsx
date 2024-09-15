import styles from './step.module.scss';
import Button from '../common/button';
import { useEffect, useState } from 'react';
import TopText from './topText';
import Navigation from '../common/navigation';
import DurationBox from './durationBox';
import { useFormContext, useWatch } from 'react-hook-form';

interface IStep2 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step2({ onNext, onBefore }: IStep2) {
  const [progress, setProgress] = useState<number>(33);
  const { control } = useFormContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(200 / 3);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const duration = useWatch({
    control,
    name: 'duration',
  });

  return (
    <div className={styles.Container}>
      <Navigation title="스피드 매칭" onClick={onBefore} />
      <div className={styles.seperator}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <TopText step={2} />
      <DurationBox />
      <div className={styles.buttonContainer}>
        <Button onClick={onNext} disabled={!duration}>
          다음
        </Button>
      </div>
    </div>
  );
}
