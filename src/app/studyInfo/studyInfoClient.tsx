'use client';

import styles from './studyInfo.module.scss';
import { useGetStudyDetail } from '@/apis/study/detail';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IconWhite } from '../../../public/icons';
import koreanFormatDate from '@/utils/dateformat';
import { IconDate, IconBook } from '../../../public/icons';
import { durationOption } from '@/data/durationData';
import { IconPeople } from '../../../public/card';
import { IconOwner, IconActiveHeart, IconHeart } from '../../../public/icons';
import Button from '@/component/common/button';
import { usePostJoinStudy } from '@/apis/study/join';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '@/component/common/modalContainer';
import ModalPortal from '@/component/common/modalPortal';
import JoinStudyModal from '@/component/modal/joinStudyModal';
import { useEffect, useState } from 'react';
import {
  usePostFavoriteStudy,
  useDeleteFavoriteStudy,
} from '@/apis/study/favorite';
import { useAlert } from '@/context/alertProvider';
import Navigation from '@/component/common/navigation';
import BottomSheet from '@/component/studyInfo/bottomSheet';
import { useQueryClient } from '@tanstack/react-query';
import { getUserProfile } from '@/apis/profile/userProfile';
import { UserProfileType } from '@/types/studyList/profile';
import { tendencyOption } from '@/data/filterData';

export default function StudyInfoClient() {
  const searchParams = useSearchParams();
  const { showAlert } = useAlert();
  const studyId = searchParams.get('studyId');
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useGetStudyDetail(Number(studyId));
  const { mutate } = usePostJoinStudy();
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const [message, setMessage] = useState<string>('');
  const [btnMsg, setBtnMsg] = useState<string>('');

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<UserProfileType | null>(
    null
  );

  const postFavorite = usePostFavoriteStudy();
  const deleteFavorite = useDeleteFavoriteStudy();

  console.log(data);

  function getDurationLabel(key: string): string | undefined {
    const option = durationOption.find((item) => item.key === key);
    return option ? option.label : undefined;
  }

  useEffect(() => {
    if (data?.userRelation) {
      setIsFavorite(data?.userRelation.is_favorite);
      setMessage(
        data?.userRelation.is_member || data?.userRelation.is_owner
          ? '스터디 들어가기'
          : '스터디 가입하기'
      );
    }
  }, [data]);

  const handleJoinStudy = () => {
    if (message === '스터디 들어가기') {
      router.push(`/chat?studyId=${studyId}`);
    } else {
      mutate(Number(studyId), {
        onSuccess: (res) => {
          setBtnMsg(res.message);
          handleOpenModal();
        },
        onError: (error) => {
          showAlert(error.message);
        },
      });
    }
  };

  const handleAddFavorite = () => {
    setIsFavorite(true);

    postFavorite.mutate(Number(studyId), {
      onSuccess: () => {},
      onError: (error) => {
        setIsFavorite(false);
        showAlert(error.message);
      },
    });
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    deleteFavorite.mutate(Number(studyId), {
      onSuccess: () => {},
      onError: (error) => {
        setIsFavorite(true);
        showAlert(error.message);
      },
    });
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedMember(null);
  };

  const handleMemberClick = async (nickname: string) => {
    const userProfile = await queryClient.fetchQuery({
      queryKey: ['getUserProfile', nickname],
      queryFn: () => getUserProfile(nickname),
    });

    setSelectedMember(userProfile);
    setIsBottomSheetOpen(true);
  };

  return (
    <>
      <Navigation title={data?.title} horiz={true} />
      <div className={styles.separator}></div>
      <div className={styles.section}>
        <div className={styles.Header}>
          <div className={styles.category}>{data?.category}</div>
          {data?.matching_type === 'Quick' ? (
            <div className={styles.quick}>
              <Image src={IconWhite} alt="빠른매칭" width={11} height={14} />
              빠른매칭
            </div>
          ) : null}
        </div>
        <div className={styles.title}>{data?.title}</div>
        {/* \n 처리 */}
        <div className={styles.description}>
          {data?.description?.split('\n').map((line: string, index: number) => (
            <p key={index}>
              {line}
              <br />
            </p>
          ))}
        </div>
        <div className={styles.tagsContainer}>
          {data?.tags?.map((tag: string) => (
            <div key={tag} className={styles.tag}>
              # {tag}
            </div>
          ))}
        </div>
        <div className={styles.thickSeperator}></div>
        <h2 className={styles.howToStudyHeader}>저희는 이렇게 공부해요</h2>
        <div className={styles.howToStudyContainer}>
          <div className={styles.duration}>
            <div className={styles.date}>
              <Image src={IconDate} alt="달력" width={15} height={15} />
              <p className={styles.subText}>기간</p>
            </div>
            <p>
              {koreanFormatDate(data?.start_date)} ~{' '}
              {koreanFormatDate(data?.end_date)} (
              {getDurationLabel(data?.duration)})
            </p>
          </div>
          <div className={styles.person}>
            <div className={styles.date}>
              <Image src={IconPeople} alt="사람" width={15} height={15} />
              <p className={styles.subText}>인원</p>
            </div>
            <p>
              {data?.membersList?.length}명 참여중 ({data?.membersList?.length}/
              {data?.max_participants_num})
            </p>
          </div>
          <div className={styles.tendency}>
            <div className={styles.date}>
              <Image src={IconBook} alt="책" width={15} height={15} />
              <p className={styles.subText}>성향</p>
            </div>
            <p>
              {
                tendencyOption.find((option) => option.key === data?.tendency)
                  ?.label
              }
            </p>
          </div>
          <h2 className={styles.joinMember}>참여 멤버</h2>
          <div className={styles.memberContainer}>
            {data?.membersList?.map(
              (member: {
                nickname: string;
                _owner: boolean;
                profileImage: string;
              }) => (
                <div
                  className={styles.memberBox}
                  key={member.nickname}
                  onClick={() => {
                    handleMemberClick(member.nickname);
                  }}
                >
                  <div className={styles.memberCircle}>
                    <Image
                      src={member?.profileImage}
                      width={64}
                      height={64}
                      alt="멤버 아이콘"
                      className={styles.profileImage}
                    />
                    {member._owner === true ? (
                      <div className={styles.owner}>
                        <Image src={IconOwner} alt="방장 아이콘" />
                      </div>
                    ) : null}
                  </div>
                  <p className={styles.nickname}>{member.nickname}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        {isFavorite ? (
          <Image
            src={IconActiveHeart}
            alt="active heart"
            className={styles.heart}
            width={39}
            height={39}
            onClick={handleRemoveFavorite}
          />
        ) : (
          <Image
            src={IconHeart}
            alt="heart"
            className={styles.heart}
            width={39}
            height={39}
            onClick={handleAddFavorite}
          />
        )}
        <Button size="medium" onClick={handleJoinStudy}>
          {message}
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <JoinStudyModal message={btnMsg} />
          </ModalContainer>
        </ModalPortal>
      )}
      {isBottomSheetOpen && (
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          memberData={selectedMember as UserProfileType}
        />
      )}
    </>
  );
}
