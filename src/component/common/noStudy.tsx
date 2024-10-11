'use client';

import { useEffect, useState, PropsWithChildren } from 'react';
import styles from './noStudy.module.scss';
import Image from 'next/image';
import { IconNothing } from '../../../public/studyList';

interface NoStudyProps {
  children?: PropsWithChildren;
  type?:
    | 'NoStudy'
    | 'NoLogin'
    | 'NoSpeed'
    | 'NoProgress'
    | 'NoFavorite'
    | 'NoBefore'
    | 'NotProgress'
    | 'NoDone';
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
    if (type === 'NoProgress') {
      setHeader('아직 가입한 쇼터디가 없어요');
      setContent('관심있는 쇼터디에 참여해보세요!');
    }
    if (type === 'NoFavorite') {
      setHeader('찜한 스터디가 없어요');
      setContent('');
    }
    if (type === 'NoBefore') {
      setHeader('참여신청한 스터디가 없어요');
      setContent('');
    }
    if (type === 'NotProgress') {
      setHeader('참여중인 스터디가 없어요');
      setContent('');
    }
    if (type === 'NoDone') {
      setHeader('완료한 스터디가 없어요');
      setContent('');
    }
  }, [type]);

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
      <p className={styles.contentBtm}>{content}</p>
    </div>
  );
}
