"use client";

import styles from "./studyInfo.module.css";
import GetStudyInfo from "../api/getStudyInfo";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Navigation from "../_component/navigation/page";
import Icon_setting from "../../../public/icons/Icon_setting.svg";
import Image from "next/image";
import StudyQuickBtn from "./_component/studyQuickBtn";
import StudySettingCard from "./_component/studySettingCard";
import ButtonFooter from "../_component/footer/ButtonFooter";
import { useSearchParams } from "next/navigation";
import MemberCard from "./_component/MemberCard";
import Category from "./_component/category";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import MemberModal from "./_component/memberModal";
import GetUserProfile from "../api/getUserProfile";
import useAuth from "@/hooks/useAuth";
import JoinStudy from "../api/joinStudy";
import InfoAlertModal from "../_component/modal/infoAlertModal";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import favoriteStudy from "../api/favoriteStudy";
import useMemberStore from "../studySetting/studyMember/store/useMemberStore";
import Loading from "../_component/Loading";

interface IFavStudy {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
  max_participants_num: number;
  cur_participants_num: number;
  created_time: string;
  category: string;
  additionalInfos: string[];
}

export default function StudyInfo() {
  const router = useRouter();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const params = useSearchParams();
  const studyIdString = params.get("studyId");
  const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
  const [tendency, setTendency] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [watchMember, setWatchMember] = useState<string>("");
  const { accessToken, user } = useAuth();
  const [modalMsg, setModalMsg] = useState<string>("");
  const [join, setJoin] = useState<boolean>(false);
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isRequestJoin, setIsRequestJoin] = useState<boolean>(false);
  const { setStartDate, isQuick, setIsQuick } = useMemberStore();
  const [userProfile, setUserProfile] = useState<IUserProfileType>({
    email: "",
    nickname: "",
    profile_img: "",
    rating: null,
    user_id: 0,
  });
  const [userStudy, setUserStudy] = useState<IUserStudyType>({ in_complete: 0, in_progress: 0 });
  const { from } = useFromStore();
  const [joiednMembers, setJoinedMembers] = useState<Imember[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["STUDY_INFO", studyId],
    queryFn: async () => GetStudyInfo(studyId),
  });

  const { data: favStudyData, error: favStudyError } = useQuery({
    queryKey: ["FAVORITE_STUDY"],
    queryFn: async () => favoriteStudy(accessToken),
  });

  useEffect(() => {
    if (data) {
      console.log(studyId, data);
      setTendency(data.tendency);
      setDuration(data.duration);
      setStartDate(data.start_date);
      setJoinedMembers(data.membersList.filter((member: Imember) => member.exit_status === "None"));

      if (data.matching_type === "Quick") {
        setIsQuick(true);
      }

      const isMember = data.membersList.filter((member: Imember) => member.nickname === user?.nickname);
      if (isMember.length > 0) {
        setIsJoined(true);
        isMember[0]?._owner === true ? setIsOwner(true) : setIsOwner(false);
      }
    }
    if (error) console.log(error);

    if (favStudyData) {
      const favStudyIdList: number[] = favStudyData.data.map((study: IFavStudy) => study.id);
      if (favStudyIdList.includes(studyId)) setIsFav(true);
    }
    if (favStudyError) console.log(favStudyError);
  }, [data, favStudyData]);

  useEffect(() => {
    if (watchMember !== "") {
      getUserProfile();
      console.log(watchMember, userProfile);
      handleOpenModal();
    }
  }, [watchMember]);

  const getUserProfile = async () => {
    try {
      const res = await GetUserProfile(watchMember, accessToken);
      setUserProfile(res.profile);
      setUserStudy(res.study_count);
    } catch (error) {
      console.log(error);
    }
  };

  const joinStudy = async (token: string) => {
    try {
      const res = await JoinStudy(studyId, token);
      console.log(res);
      if (res.message === "이미 가입 신청한 사용자입니다.") {
        setIsRequestJoin(true);
        setModalMsg("이미 가입 신청한 쇼터디입니다.");
      }
    } catch (error) {
      console.log(error);
    }

    if (join) {
      console.log("joined");
    }
  };

  const handleJoinStudy = () => {
    if (data.max_participants_num === data.cur_participants_num) {
      setModalMsg("참가 인원이 꽉 찬 스터디입니다.");
    } else if (data.matching_type === "Quick") {
      setModalMsg("스터디를 가입했어요.");
    } else {
      setModalMsg("스터디를 가입 신청했어요.");
    }
    accessToken && joinStudy(accessToken);
    setJoin(true);
  };

  const formatTendency = (tendency: string) => {
    switch (tendency) {
      case "Active":
        return "활발한 대화와 동기부여 원해요";
      case "Feedback":
        return "학습 피드백을 주고받고 싶어요";
      case "Focus":
        return "조용히 집중하고 싶어요";
      default:
        return "";
    }
  };

  const formatDuration = (duration: string) => {
    switch (duration) {
      case "1w":
        return "일주일";
      case "1m":
        return "한달";
      case "3m":
        return "3개월";
      case "6m":
        return "6개월";
      default:
        return "미정";
    }
  };

  const handleCloseAlert = () => {
    handleCloseModal();
    setJoin(false);
  };

  const handleCloseProfileModal = () => {
    handleCloseModal();
    setWatchMember("");
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Navigation
            isBack={true}
            dark={false}
            onClick={() => {
              router.push(`./${from}`);
            }}
          >
            <p>{data.title}</p>
            {isOwner ? (
              <Image
                className={styles.settingIcon}
                src={Icon_setting}
                width={48}
                height={48}
                onClick={() => {
                  router.push(`./studySetting?studyId=${studyId}`);
                }}
                alt="settingIcon"
              />
            ) : null}
          </Navigation>
          <div className={styles.hrOrange}></div>
          <div className={styles.filterBox}>
            {data.matching_type === "Quick" && <StudyQuickBtn />}
            <Category>{data.category}</Category>
          </div>
          <div className={styles.studyDetail}>
            <p className={styles.studyTitle}>{data.title}</p>
            <p className={styles.studyDescription}>{data.description}</p>
            <div className={styles.tagBox}>
              {data.tags.map((tag: string, index: number) => (
                <p key={index} className={styles.tag}>
                  #{tag}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.hrLine}></div>
          <div className={styles.studySetting}>
            <p className={styles.subTitle}>학습 설정</p>
            <div className={styles.cardBox}>
              <StudySettingCard type="기간" descript={formatDuration(data.duration)}></StudySettingCard>
              <StudySettingCard type="인원" descript={`${joiednMembers.length}명`}></StudySettingCard>
              <StudySettingCard type="분위기" descript={formatTendency(data.tendency)}></StudySettingCard>
            </div>
          </div>
          <div className={styles.hrLine}></div>
          <div className={styles.membersBox}>
            <p className={styles.subTitle}>참여 멤버</p>
            <div className={styles.members}>
              {joiednMembers.map((member: Imember, index: number) => (
                <MemberCard key={index} member={member} onClick={() => setWatchMember(member.nickname)} />
              ))}
            </div>
          </div>
          <div className={styles.footer}>
            {isJoined ? (
              <ButtonFooter
                isFav={isFav}
                setIsFav={setIsFav}
                study_id={studyId}
                onClick={() => {
                  router.push(`../chat?studyId=${studyId}`);
                }}
              >
                입장하기
              </ButtonFooter>
            ) : (
              <ButtonFooter isFav={isFav} setIsFav={setIsFav} study_id={studyId} onClick={handleJoinStudy}>
                가입하기
              </ButtonFooter>
            )}
          </div>
          {openModal && (
            <ModalPortal>
              <ModalContainer handleCloseModal={handleCloseProfileModal}>
                <MemberModal handleCloseModal={handleCloseProfileModal} user={userProfile} study={userStudy} />
              </ModalContainer>
            </ModalPortal>
          )}
          {join && !isRequestJoin && (
            <ModalPortal>
              <ModalContainer handleCloseModal={handleCloseAlert}>
                <InfoAlertModal handleCloseModal={handleCloseAlert}>{modalMsg}</InfoAlertModal>
              </ModalContainer>
            </ModalPortal>
          )}
          {isRequestJoin && (
            <ModalPortal>
              <ModalContainer handleCloseModal={handleCloseAlert}>
                <InfoAlertModal handleCloseModal={handleCloseAlert}>{modalMsg}</InfoAlertModal>
              </ModalContainer>
            </ModalPortal>
          )}
        </>
      )}
    </div>
  );
}
