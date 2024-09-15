import { useEffect, useState } from 'react';
import Navigation from '../common/navigation';
import styles from './step.module.scss';
import TopText from './topText';
import Button from '../common/button';
import TendencyBox from '../fastMatching/tendencyBox';
import { useFormContext, useWatch } from 'react-hook-form';
import { matchingTypeOption } from '@/data/filterData';

interface IStep3 {
  onNext: () => void;
  onBefore: () => void;
}

export default function Step3({ onNext, onBefore }: IStep3) {
  const [progress, setProgress] = useState<number>(50);
  const { control, setValue } = useFormContext();

  const [tendency, matching_type] = useWatch({
    control,
    name: ['tendency', 'matching_type'],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(75);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (key: string) => {
    if (matching_type === key) {
      setValue('matching_type', '');
    } else {
      setValue('matching_type', key);
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
        <TopText step={3} />
        <div className={styles.ContentsContainer}>
          <p className={styles.contents}>나의 학습 성향은?</p>
          <TendencyBox type="createStudy" />
          <p className={styles.contents}>신청 방식</p>
          <div className={styles.matchingContainer}>
            {matchingTypeOption.map((item) => (
              <div
                key={item.key}
                className={`${styles.optionBox} ${
                  matching_type === item.key ? styles.active : ''
                }`}
                onClick={() => handleClick(item.key)}
              >
                <p>{item.label}</p>
                <p className={styles.subText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={onNext} disabled={!tendency || !matching_type}>
          다음
        </Button>
      </div>
    </div>
  );
}
