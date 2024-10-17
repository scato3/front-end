import { useEffect, useState } from 'react';
import styles from './bottomSheet.module.scss';
import { IconBlackX } from '../../../public/icons';
import Image from 'next/image';
import { UserProfileType } from '@/types/studyList/profile';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  memberData: UserProfileType;
}

export default function BottomSheet({
  isOpen,
  onClose,
  memberData,
}: BottomSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [rating, setRating] = useState(0); // 애니메이션을 위한 상태

  console.log(memberData);

  // open, close의 delay를 위한 useEffect, 안하면 바로 켜지고 꺼져버림
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);

    setTimeout(() => {
      onClose();
    }, 500);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      setTimeout(() => {
        setRating(memberData?.profile.rating || 0);
      }, 200);
    } else {
      setIsAnimating(false);
      setRating(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.overLay} ${isAnimating ? styles.open : ''}`}
      onClick={handleClose}
    >
      <div
        className={`${styles.bottomSheet} ${isAnimating ? styles.open : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.sheetContent}>
          <h2>{memberData?.profile.nickname}</h2>
          <Image
            src={IconBlackX}
            width={16}
            height={16}
            alt="종료 아이콘"
            onClick={handleClose}
            className={styles.iconX}
          />
          <div className={styles.imageContainer}>
            <Image
              src={memberData?.profile.profile_img}
              width={127}
              height={127}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
          </div>
          <div className={styles.countContainer}>
            <div className={styles.inprogress}>
              <p>참여중</p>
              <span>{memberData?.study_count.in_progress}</span>
            </div>
            <div className={styles.incomplete}>
              <p>참여 완료</p>
              <span>{memberData?.study_count.in_complete}</span>
            </div>
          </div>
          <div className={styles.ratingBox}>
            <div className={styles.ratingHeader}>
              <p>쇼터디 성적표</p>
              <p>{memberData?.profile.rating || 0}점</p>
            </div>
            <div
              className={`${styles.ratingBar} ${
                rating > 0 ? styles.ratingBarFilled : ''
              }`}
              style={{ width: `${rating}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
