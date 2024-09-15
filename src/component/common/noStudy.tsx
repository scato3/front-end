import { useEffect, useState, PropsWithChildren } from 'react';
import styles from './noStudy.module.scss';
import Image from 'next/image';
import { IconNothing } from '../../../public/studyList';

interface NoStudyProps {
  children?: PropsWithChildren;
  type?: 'NoStudy' | 'NoLogin' | 'NoSpeed';
}

export default function NoStudy({ type = 'NoStudy' }: NoStudyProps) {
  const [content, setContent] = useState<string>('');
  const [header, setHeader] = useState<string>('');

  // useEffect로 상태 업데이트
  useEffect(() => {
    if (type === 'NoStudy') {
      setContent('직접 쇼터디를 등록해 보세요!');
      setHeader('모집 중인 쇼터디가 없어요...');
    }
    if (type === 'NoLogin') {
      setContent('로그인이 필요한 서비스예요.');
      setHeader('조건에 맞는 쇼터디가 없어요');
    }
    if (type === 'NoSpeed') {
      setContent('직접 쇼터디를 등록해 보세요!');
      setHeader('조건에 맞는 쇼터디가 없어요.');
    }
  }, [type]); // type이 변경될 때만 실행됨

  return (
    <div className={styles.container}>
      <Image
        className={styles.icon}
        src={IconNothing}
        alt="noStudy"
        width={110}
        height={110}
      />
      <p className={styles.contentTop}>{header}</p>
      <p
        className={`${styles.contentBtm} ${
          type === 'NoSpeed' ? styles.active : ''
        }`}
      >
        {content}
      </p>
    </div>
  );
}
