'use client';

import styles from './profile.module.scss';
import Image from 'next/image';
import { IconPencil } from '../../../public/icons';
import { useEffect, useState } from 'react';
import { RightArrow } from '../../../public/arrow';
import ProfileBottomSheet from '@/component/profile/profileBottomSheet';
import { MyProfileType } from '@/types/profile/profileType';

interface ProfileClientProps {
  data: MyProfileType; // props로 MyProfileType을 받음
}

export default function ProfileClient({ data }: ProfileClientProps) {
  const [rating, setRating] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [nickname, setNickname] = useState(data.profile.nickname);

  useEffect(() => {
    setTimeout(() => {
      setRating(data.profile.rating ?? 0);
    }, 200);
  }, []);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
  };

  return (
    <>
      <div className={styles.profileConainer}>
        <div className={styles.profileImage}></div>
        <h2>{nickname}</h2>
        <div
          className={styles.editContainer}
          onClick={() => {
            setIsBottomSheetOpen(true);
          }}
        >
          <Image src={IconPencil} alt="편집 이미지" />
          프로필 편집
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.myrecord}>
          <p>나의 쇼터디 성적표</p>
          <p>{data.profile.rating ?? 0}점</p>
        </div>
        <div className={styles.ratingBar}>
          <div
            className={styles.ratingBarFilled}
            style={{ width: `${rating}%` }}
          ></div>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.statusItem}>
            <p>찜</p>
            <p className={styles.statusNumber}>
              {data.study_count.in_favorite}
            </p>
          </div>
          <div className={styles.statusItem}>
            <p>승인대기</p>
            <p className={styles.statusNumber}>
              {data.study_count.in_proposal}
            </p>
          </div>
          <div className={styles.statusItem}>
            <p>참여중</p>
            <p className={styles.statusNumber}>
              {data.study_count.in_progress}
            </p>
          </div>
          <div className={styles.statusItem}>
            <p>완료</p>
            <p className={styles.statusNumber}>
              {data.study_count.in_complete}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.section}>
        <h2 className={styles.notice}>서비스 안내 v1.0</h2>
        <div className={styles.terms}>
          <p>이용약관</p>
          <Image
            src={RightArrow}
            width={8}
            height={14}
            alt="화살표"
            className={styles.termsImg}
          />
        </div>
        <div className={styles.terms}>
          <p>개인정보 처리방침</p>
          <Image
            src={RightArrow}
            width={8}
            height={14}
            alt="화살표"
            className={styles.termsImg}
          />
        </div>
        {isBottomSheetOpen && (
          <ProfileBottomSheet
            isOpen={isBottomSheetOpen}
            onClose={handleCloseBottomSheet}
            nickname={nickname}
            onNicknameChange={handleNicknameChange}
          />
        )}
      </div>
    </>
  );
}
