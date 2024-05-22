"use client";

import styles from "./studyMember.module.css";
import Navigation from "../_component/navigation/page";
import GetJoinRequest from "../api/getJoinRequest";
import GetStudyMembers from "../api/getStudyMembers";
import Button from "../_component/button/Button";
import MemberCard from "./_component/memberCard";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OutStudyMember from "../api/outStudyMember";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import { useModal } from "@/hooks/useModal";
import OutMemberModal from "./_component/outMemberModal";
import useMemberStore from "./store/useMemberStore";
import AlertModal from "../_component/modal/alertModal";
import { useRouter } from "next/navigation";
import AcceptJoinStudy from "../api/acceptJoinRequest";
import DeclineJoinStudy from "../api/declineJoinRequest";
import moment from "moment";
import MemberModal from "../studyInfo/_component/memberModal";
import GetUserProfile from "../api/getUserProfile";
import Loading from "../_component/Loading";

export default function studyMember() {
    //const {accessToken} = useAuth();
    const router = useRouter();
    const params = useSearchParams();
    const studyIdString = params.get("studyId");
    const accessToken: string = params.get("token") ?? "";
    const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
    const [ isJoinRequest, setIsJoinRequest ] = useState<boolean>(false);
    const [ isJoinMember, setIsJoinMember ] = useState<boolean>(false);
    const [ joinedMembers, setJoinedMembers ] = useState<IJoinedMember[]>([]);
    const [ JoinRequests, setJoinRequests ] = useState<IRequestMember[]>([]);
    const { openModal:openProfileModal, handleOpenModal:handleOpenProfileModal, handleCloseModal:closeProfileModal } =  useModal();
    const { openModal:openOutModal, handleOpenModal:handleOpenOutModal, handleCloseModal:handleCloseOutModal } =  useModal();
    const { openModal:openAlertModal, handleOpenModal:handleOpenAlertModal, handleCloseModal:handleCloseAlertModal } =  useModal();
    const { outMemberName, setOutMemberName, outUserId, setOutUserId, exitReasons, 
            setAcceptUserId, setDeclineUserId, acceptUserId, declineUserId, 
            startDate, isQuick } = useMemberStore();
    const [ watchMember, setWatchMember ] = useState<string>("");
    const [ userStudy, setUserStudy ] = useState<IUserStudyType>({ in_complete: 0, in_progress: 0 });
    const [ userProfile, setUserProfile ] = useState<IUserProfileType>({
        email: "",
        nickname: "",
        profile_img: "",
        rating: null,
        user_id: 0,
    });
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const url:string = `/studyMember?studyId=${studyId}&token=${accessToken}`;


    useEffect(() => {
        setIsLoading(true);
        console.log("rerender", studyId);
        if (!isQuick && moment(startDate).isSameOrAfter(moment(), "day")) {
            setIsJoinRequest(true);
            getRequestMembers();
        } else {
            setIsJoinMember(true);
            getStudyMembers();
        }
    },[]);

    useEffect(() => {
        if (watchMember !== "") {
            getUserProfile();
            handleOpenProfileModal();
        }
        }, [watchMember]);

    useEffect(() => {
        setIsLoading(true);
        acceptJoinRequest();

    }, [acceptUserId]);

    useEffect(() => {
        setIsLoading(true);
        declineJoinRequest();
        router.push(url);

    }, [declineUserId]);

    const getRequestMembers = async() => {
        try{
            setIsLoading(true);
            const res = await GetJoinRequest(studyId, accessToken);
            console.log(res);
            setJoinRequests(res.data);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);
    };

    const getStudyMembers = async() => {
        try{
            const res = await GetStudyMembers(studyId, accessToken);
            setJoinedMembers(res.data);
            console.log(res);
        }catch(error){
            console.log(error);
        }
        setIsLoading(false);

    };

    const outStudyMember = async() => {
        try{
            const res = await OutStudyMember(studyId, outUserId, exitReasons, accessToken);
            console.log(res);
        }catch(error){
            console.log(error);
        }
        getStudyMembers();
    };

    const acceptJoinRequest = async() => {
        try{
            const res = await AcceptJoinStudy(studyId, acceptUserId, accessToken);
            console.log(res);
        }catch(error){
            console.log(error);
        }
        getRequestMembers();
        setIsLoading(false);
    };

    const declineJoinRequest = async() => {
        try{
            const res = await DeclineJoinStudy(studyId, declineUserId, accessToken);
            console.log(res);
        }catch(error){
            console.log(error);
        }
        getRequestMembers();
        setIsLoading(false);
    };
    
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
        setIsLoading(true);
        getRequestMembers();
        setIsJoinRequest(true);
        setIsJoinMember(false);
    };

    const handleStudyMember = () => {
        setIsLoading(true);
        getStudyMembers();
        setIsJoinMember(true);
        setIsJoinRequest(false);
    };

    const handleOutMember = (member:IJoinedMember) => {
        handleOpenOutModal();
        setOutMemberName(member.nickname);
        setOutUserId(member.user_id)
    };

    const handleOutMemberOk = () => {
        handleCloseOutModal();
        console.log("out");
        outStudyMember();
        handleOpenAlertModal();
    };

    const handleOk = () => {
        setIsLoading(true);
        handleCloseAlertModal();
        router.push(url);
    };

    const handleAcceptRequest = (member:IRequestMember) => {
        setIsLoading(true);
        setAcceptUserId(member.user_id);
    };

    const handleDeclineRequest = (member:IRequestMember) => {
        setIsLoading(true);
        setDeclineUserId(member.user_id);
    };

    const handleCloseProfileModal = () => {
        closeProfileModal();
        setWatchMember("");
    }

    return(
        <div className={styles.container}>
            {isLoading && <Loading />}
            <Navigation isBack={true} dark={false} onClick={() => router.back()}>쇼터디 멤버 관리</Navigation>
            <div className={styles.hr}></div>
            <div className={styles.contentContainer}>
                <div className={styles.btnBox}>
                    <Button size="very_small" property={isJoinRequest ? "confirm" : "disabledColor"} onClick={handleRequestMember}>신청 내역</Button>
                    <Button size="very_small" property={isJoinMember ? "confirm" : "disabledColor"} onClick={handleStudyMember}>참여 멤버</Button>
                </div>
                <div className={styles.membersBox}>
                    {isJoinMember &&
                        joinedMembers.map((member) => (
                            <MemberCard isMember={true} 
                                        key={member.user_id} 
                                        memberData={member}
                                        handleOutMember={() => handleOutMember(member)}
                                        onClick={() => setWatchMember(member.nickname)} />
                        ))
                    }
                    {isJoinRequest &&
                        JoinRequests.map((member) => (
                            <MemberCard isRequest={true} 
                                        isAccepted={member.join_status === "Approved" ? true : false}
                                        isRequesting={member.join_status === "Waiting" ? true : false}
                                        isDeclined={member.join_status === "rejected" ? true : false}
                                        key={member.user_id} 
                                        requestData={member}
                                        handleAcceptRequest={() =>  handleAcceptRequest(member)}
                                        handleDeclineRequest={() => handleDeclineRequest(member)}
                                        onClick={() => setWatchMember(member.nickname)}
                            />
                        ))
                    }
                </div>
            </div>

            {openOutModal &&
                <ModalPortal>
                    <ModalContainer>
                        <OutMemberModal handleOutMember={handleOutMemberOk} handleCloseModal={handleCloseOutModal}/>
                    </ModalContainer>
                </ModalPortal>
            }

            {openAlertModal &&
                <ModalPortal>
                    <ModalContainer>
                        <AlertModal handleCloseModal={handleOk}>{outMemberName}님을 내보냈어요.</AlertModal>
                    </ModalContainer>
                </ModalPortal>
            }

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