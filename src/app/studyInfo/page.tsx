'use client';

import styles from './studyInfo.module.scss';
import Navigation from '@/component/common/navigation';
import { useGetStudyDetail } from '@/apis/study/detail';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { IconHoriz, IconWhite } from '../../../public/icons';
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
import { useState } from 'react';
import {
  usePostFavoriteStudy,
  useDeleteFavoriteStudy,
} from '@/apis/study/favorite';

export default function StudyInfo() {
  const searchParams = useSearchParams();
  const studyId = searchParams.get('studyId');

  const { data } = useGetStudyDetail(Number(studyId));
  const { mutate } = usePostJoinStudy();
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const [message, setMessage] = useState<string>('');

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const postFavorite = usePostFavoriteStudy();
  const deleteFavorite = useDeleteFavoriteStudy();

  console.log(data);

  function getDurationLabel(key: string): string | undefined {
    const option = durationOption.find((item) => item.key === key);
    return option ? option.label : undefined;
  }

  // function getTendencyLabel(key: string): string | undefined {
  //   const option = durationOption.find((item) => item.key === key);
  //   return option ? option.label : undefined;
  // }

  const handleJoinStudy = () => {
    mutate(Number(studyId), {
      onSuccess: (res) => {
        setMessage(res.message);
        handleOpenModal();
      },
      onError: (error) => {
        console.log(error.message);
      },
    });
  };

  // 즐겨찾기 추가 핸들러
  const handleAddFavorite = () => {
    postFavorite.mutate(Number(studyId), {
      onSuccess: () => {
        setIsFavorite(true);
      },
      onError: (error) => {
        console.error((error as Error).message);
      },
    });
  };

  // 즐겨찾기 삭제 핸들러
  const handleRemoveFavorite = () => {
    deleteFavorite.mutate(Number(studyId), {
      onSuccess: () => {
        setIsFavorite(false);
      },
      onError: (error) => {
        console.error((error as Error).message);
      },
    });
  };

  return (
    <div className={styles.Container}>
      <Navigation title={data?.title} />
      <Image src={IconHoriz} alt="horiz" className={styles.horiz} />
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
          {data?.description?.split('\n').map((line: string) => (
            <span key={line}>
              {line}
              <br />
            </span>
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
            <p>{data?.tendency}</p>
          </div>
          <h2 className={styles.joinMember}>참여 멤버</h2>
          <div className={styles.memberContainer}>
            {data?.membersList?.map(
              (member: { nickname: string; _owner: boolean }) => (
                <div className={styles.memberBox} key={member.nickname}>
                  <div className={styles.memberCircle}>
                    {member._owner === true ? (
                      <Image
                        src={IconOwner}
                        width={22}
                        height={22}
                        alt="방장 아이콘"
                        className={styles.owner}
                      />
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
          스터디 가입하기
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <JoinStudyModal message={message} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
