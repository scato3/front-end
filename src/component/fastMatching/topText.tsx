import { useEffect, useState } from 'react';
import styles from './topText.module.scss';

interface ITopText {
  step: 1 | 2 | 3;
}

const texts: {
  step: number;
  content: string;
}[] = [
  {
    step: 1,
    content: '원하는 학습분야가 있으신가요?',
  },
  {
    step: 2,
    content: '원하는 학습기간이 궁금해요!',
  },
  {
    step: 3,
    content: '학습 성향과 선호 인원을 알려주세요!',
  },
];
export default function TopText({ step }: ITopText) {
  const [text, setText] = useState<string>();

  useEffect(() => {
    setText(texts[step - 1].content);
  }, [step]);

  return (
    <div className={styles.Container}>
      <p className={styles.StepP}>STEP{step}</p>
      <p className={styles.ContentP}>{text}</p>
    </div>
  );
}
