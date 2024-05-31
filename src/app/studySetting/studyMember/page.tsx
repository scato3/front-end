"use client";

import styles from "./studyMember.module.css";
import Navigation from "@/app/_component/navigation/page";
import GetJoinRequest from "@/app/api/getJoinRequest";
import GetStudyMembers from "@/app/api/getStudyMembers";
import Button from "@/app/_component/button/Button";
import MemberCard from "./_component/memberCard";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OutStudyMember from "@/app/api/outStudyMember";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hooks/useModal";
import OutMemberModal from "./_component/outMemberModal";
import useMemberStore from "./store/useMemberStore";
import AlertModal from "@/app/_component/modal/alertModal";
import { useRouter } from "next/navigation";
import AcceptJoinStudy from "@/app/api/acceptJoinRequest";
import DeclineJoinStudy from "@/app/api/declineJoinRequest";
import moment from "moment";
import MemberModal from "@/app/studyInfo/_component/memberModal";
import GetUserProfile from "@/app/api/getUserProfile";
import Loading from "@/app/_component/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NoMember from "./_component/NoMember";

export default function studyMember() {
  const { accessToken } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const studyIdString = params.get("studyId");
  const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
  const [isJoinRequest, setIsJoinRequest] = useState<boolean>(false);
  const [isJoinMember, setIsJoinMember] = useState<boolean>(false);
  const [joinedMembers, setJoinedMembers] = useState<IJoinedMember[]>([]);
  const [JoinRequests, setJoinRequests] = useState<IRequestMember[]>([]);
  const queryClient = useQueryClient();

  const {
    openModal: openProfileModal,
    handleOpenModal: handleOpenProfileModal,
    handleCloseModal: closeProfileModal,
  } = useModal();

  const {
    openModal: openOutModal,
    handleOpenModal: handleOpenOutModal,
    handleCloseModal: handleCloseOutModal,
  } = useModal();

  const {
    openModal: openAlertModal,
    handleOpenModal: handleOpenAlertModal,
    handleCloseModal: handleCloseAlertModal,
  } = useModal();

  const {
    outMemberName,
    setOutMemberName,
    outUserId,
    setOutUserId,
    exitReasons,
    setExitReasons,
    setAcceptUserId,
    setDeclineUserId,
    acceptUserId,
    declineUserId,
    startDate,
    isQuick,
  } = useMemberStore();

  const [watchMember, setWatchMember] = useState<string>("");
  const [userStudy, setUserStudy] = useState<IUserStudyType>({ in_complete: 0, in_progress: 0 });
  const [userProfile, setUserProfile] = useState<IUserProfileType>({
    email: "",
    nickname: "",
    profile_img: "",
    rating: null,
    user_id: 0,
  });

  useEffect(() => {
    if (!isQuick && moment(startDate).isSameOrAfter(moment(), "day")) {
      setIsJoinRequest(true);
    } else {
      setIsJoinMember(true);
    }
  }, []);

  useEffect(() => {
    if (watchMember !== "") {
      getUserProfile();
      handleOpenProfileModal();
    }
  }, [watchMember]);

  // Join Request 데이터 받아오기
  const { data: joinData, isLoading: isRequestLoading } = useQuery({
    queryKey: ["JOIN_REQUEST"],
    queryFn: async () => {
      const result = await GetJoinRequest(studyId, accessToken);
      return result;
    },
    enabled: !!accessToken,
  });

  // Request Member 데이터에 넣기
  useEffect(() => {
    if (joinData) {
      setJoinRequests(joinData.data);
    }
  }, [joinData]);

  // Study Member 받아오기
  const { data: studyData, isLoading: studyLoading } = useQuery({
    queryKey: ["GET_STUDY"],
    queryFn: async () => {
      const res = await GetStudyMembers(studyId, accessToken);
      console.log(res);
      return res;
    },
    enabled: !!accessToken,
  });

  // Study Member 데이터에 넣기
  useEffect(() => {
    if (joinData) {
      setJoinedMembers(studyData.data);
    } 
  }, [studyData]);

  const outStudyMember = useMutation({
    mutationFn: () => OutStudyMember(studyId, outUserId, exitReasons, accessToken),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GET_STUDY"] });
    },
  });

  const AcceptStudy = useMutation({
    mutationFn: () => AcceptJoinStudy(studyId, acceptUserId, accessToken),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GET_STUDY"] });
      await queryClient.invalidateQueries({ queryKey: ["JOIN_REQUEST"] });
    },
  });

  const DeclineStudy = useMutation({
    mutationFn: () => DeclineJoinStudy(studyId, declineUserId, accessToken),
    onSuccess: () => {},
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["GET_STUDY"] });
      await queryClient.invalidateQueries({ queryKey: ["JOIN_REQUEST"] });
    },
  });

  const getUserProfile = async () => {
    try {
      const res = await GetUserProfile(watchMember, accessToken);
      setUserProfile(res.profile);
      setUserStudy(res.study_count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestMember = () => {
    setIsJoinRequest(true);
    setIsJoinMember(false);
  };

  const handleStudyMember = () => {
    setIsJoinRequest(false);
    setIsJoinMember(true);
  };

  const handleOutMember = (member: IJoinedMember) => {
    handleOpenOutModal();
    setOutMemberName(member.nickname);
    setOutUserId(member.user_id);
  };

  const handleOutMemberOk = () => {
    outStudyMember.mutate();
    handleCloseOutModal();
    handleOpenAlertModal();
  };

  const handleOk = () => {
    handleCloseAlertModal();
    setExitReasons([]);
  };

  const handleAcceptRequest = (member: IRequestMember) => {
    setAcceptUserId(member.user_id);
    AcceptStudy.mutate();
  };

  const handleDeclineRequest = (member: IRequestMember) => {
    setDeclineUserId(member.user_id);
    DeclineStudy.mutate();
  };

  const handleCloseProfileModal = () => {
    closeProfileModal();
    setWatchMember("");
  };

  return (
    <div className={styles.container}>
      {(isRequestLoading || studyLoading) && <Loading />}
      <Navigation isBack={true} dark={false} onClick={() => router.back()}>
        쇼터디 멤버 관리
      </Navigation>
      <div className={styles.hr}></div>
      <div className={styles.contentContainer}>
        <div className={styles.btnBox}>
          <Button
            size="very_small"
            property={isJoinRequest ? "confirm" : "disabledColor"}
            onClick={handleRequestMember}
          >
            신청 내역
          </Button>
          <Button size="very_small" property={isJoinMember ? "confirm" : "disabledColor"} onClick={handleStudyMember}>
            참여 멤버
          </Button>
        </div>
        <div className={styles.membersBox}>
          {isJoinMember && 
            joinedMembers.map((member) => (
                <MemberCard
                    isMember={true}
                    key={member.user_id}
                    memberData={member}
                    handleOutMember={() => handleOutMember(member)}
                    onClick={() => setWatchMember(member.nickname)}
                />
            ))}
            {isJoinMember && joinedMembers.length === 0 &&
                (<NoMember>참여 멤버가 없어요</NoMember>)
            }
          {isJoinRequest && 
            JoinRequests.map((member) => (
                <MemberCard
                    isRequest={true}
                    isAccepted={member.join_status === "Approved" ? true : false}
                    isRequesting={member.join_status === "Waiting" ? true : false}
                    isDeclined={member.join_status === "Rejected" ? true : false}
                    key={member.user_id}
                    requestData={member}
                    handleAcceptRequest={() => handleAcceptRequest(member)}
                    handleDeclineRequest={() => handleDeclineRequest(member)}
                    onClick={() => setWatchMember(member.nickname)}
                />
            ))}
            {isJoinRequest && JoinRequests.length === 0 &&
                <NoMember>받은 신청이 없어요</NoMember>
            }
        </div>
      </div>

      {openOutModal && (
        <ModalPortal>
          <ModalContainer>
            <OutMemberModal handleOutMember={handleOutMemberOk} handleCloseModal={handleCloseOutModal} />
          </ModalContainer>
        </ModalPortal>
      )}

      {openAlertModal && (
        <ModalPortal>
          <ModalContainer>
            <AlertModal handleCloseModal={handleOk}>{outMemberName}님을 내보냈어요.</AlertModal>
          </ModalContainer>
        </ModalPortal>
      )}

      {openProfileModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseProfileModal}>
            <MemberModal handleCloseModal={handleCloseProfileModal} user={userProfile} study={userStudy} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
