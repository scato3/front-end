'use client';

import styles from './profile.module.scss';
import Image from 'next/image';
import { IconPencil } from '../../../public/icons';
import { useEffect, useState } from 'react';
import { RightArrow } from '../../../public/arrow';
import ProfileBottomSheet from '@/component/profile/profileBottomSheet';
import { useGetMyProfile } from '@/apis/profile/userProfile';
import { useRouter } from 'next/navigation';
import { IconSetting } from '../../../public/icons';

export default function ProfileClient() {
  const [rating, setRating] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const { data } = useGetMyProfile();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setRating(data?.profile.rating ?? 0);
    }, 200);
    console.log(data);
  }, [data]);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div className={styles.navigation}>
        마이페이지
        <Image
          src={IconSetting}
          alt="세팅 이미지"
          className={styles.settingImg}
          onClick={() => {
            router.push('./profile/setting');
          }}
        />
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.profileImage}>
          {data?.profile.profile_img && (
            <Image
              src={data.profile.profile_img}
              alt="프로필 이미지"
              width={107}
              height={107}
              objectFit="cover"
              className={styles.profileImage}
            />
          )}
        </div>
        <h2>{data?.profile.nickname}</h2>
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
          <p>{data?.profile.rating ?? 0}점</p>
        </div>
        <div className={styles.ratingBar}>
          <div
            className={styles.ratingBarFilled}
            style={{ width: `${rating}%` }}
          ></div>
        </div>
        <div className={styles.statusContainer}>
          <div
            className={styles.statusItem}
            onClick={() => {
              router.push('./profile/favorite');
            }}
          >
            <p>찜</p>
            <p className={styles.statusNumber}>
              {data?.study_count.in_favorite}
            </p>
          </div>
          <div
            className={styles.statusItem}
            onClick={() => {
              router.push('./profile/situation?tab=before');
            }}
          >
            <p>승인대기</p>
            <p className={styles.statusNumber}>
              {data?.study_count.in_proposal}
            </p>
          </div>
          <div
            className={styles.statusItem}
            onClick={() => {
              router.push('./profile/situation?tab=progress');
            }}
          >
            <p>참여중</p>
            <p className={styles.statusNumber}>
              {data?.study_count.in_progress}
            </p>
          </div>
          <div
            className={styles.statusItem}
            onClick={() => {
              router.push('./profile/situation?tab=done');
            }}
          >
            <p>완료</p>
            <p className={styles.statusNumber}>
              {data?.study_count.in_complete}
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
            nickname={data?.profile.nickname || ''}
            profile_image={data?.profile.profile_img || ''}
          />
        )}
      </div>
    </>
  );
}
