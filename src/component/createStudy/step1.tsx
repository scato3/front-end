import { useState, useEffect } from 'react';
import { useWatch, useFormContext } from 'react-hook-form';
import styles from './step.module.scss';
import Button from '../common/button';
import TopText from './topText';
import Navigation from '../common/navigation';
import CategoryBox from '../fastMatching/categoryBox';

interface IStep1 {
  onNext: () => void;
}

export default function Step1({ onNext }: IStep1) {
  const [progress, setProgress] = useState<number>(0);

  const { control } = useFormContext();

  const category = useWatch({
    control,
    name: 'category',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100 / 4);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className={styles.Container}>
      <Navigation title="쇼터디 생성" />
      <div className={styles.seperator}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <TopText step={1} />
      <CategoryBox />
      <div className={styles.buttonContainer}>
        <Button onClick={onNext} disabled={!category}>
          다음
        </Button>
      </div>
    </div>
  );
}
