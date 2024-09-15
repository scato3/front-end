import { useEffect, useState } from 'react';
import styles from './topText.module.scss';

interface ITopText {
  step: 1 | 2 | 3 | 4;
}

const texts: {
  step: number;
  content: string;
}[] = [
  {
    step: 1,
    content: '공부하고 싶은 학습분야를 선택해주세요.',
  },
  {
    step: 2,
    content: '쇼터디 진행기간과 모집인원을 선택해주세요.',
  },
  {
    step: 3,
    content: '학습 성향과 신청 방식을 선택해주세요.',
  },
  {
    step: 4,
    content: '쇼터디 이름과 소개글, 태그를 작성해 주세요.',
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
