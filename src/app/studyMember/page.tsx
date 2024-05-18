"use client";

import styles from "./studyMember.module.css";
import Navigation from "../_component/navigation/page";
import GetJoinRequest from "../api/getJoinRequest";
import GetStudyMembers from "../api/getStudyMembers";
import Button from "../_component/button/Button";
import MemberCard from "./_component/memberCard";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import OutStudyMember from "../api/outStudyMember";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import { useModal } from "@/hooks/useModal";
import OutMemberModal from "./_component/outMemberModal";
import useMemberStore from "./store/useMemberStore";
import AlertModal from "../_component/modal/alertModal";
import { useRouter } from "next/navigation";

export default function studyMember() {
    const {accessToken} = useAuth();
    const router = useRouter();
    const params = useSearchParams();
    const studyIdString = params.get("studyId");
    const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
    const [ isJoinRequest, setIsJoinRequest ] = useState<boolean>(false);
    const [ isJoinMember, setIsJoinMember ] = useState<boolean>(false);
    const [ joinedMembers, setJoinedMembers ] = useState<IJoinedMember[]>([]);
    const { openModal:openOutModal, handleOpenModal:handleOpenOutModal, handleCloseModal:handleCloseOutModal } =  useModal();
    const { openModal:openAlertModal, handleOpenModal:handleOpenAlertModal, handleCloseModal:handleCloseAlertModal } =  useModal();
    const { outMemberName, setOutMemberName, outUserId, setOutUserId, exitReasons } = useMemberStore();
    
    const getRequestMembers = async() => {
        try{
            const res = await GetJoinRequest(studyId, accessToken);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    };

    const getStudyMembers = async() => {
        try{
            const res = await GetStudyMembers(studyId, accessToken);
            setJoinedMembers(res.data);
            console.log(res.data);
        }catch(error){
            console.log(error);
        }
    ;}

    const outStudyMember = async() => {
        try{
            const res = await OutStudyMember(studyId, outUserId, exitReasons, accessToken);
            console.log(res);
        }catch(error){
            console.log(error);
        }
    };

    const handleRequestMember = () => {
        getRequestMembers();
        setIsJoinRequest(true);
        setIsJoinMember(false);
    };

    const handleStudyMember = () => {
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
    }

    const handleOk = () => {
        router.push(`/studyMember?studyId=${studyId}`)
    }


    return(
        <div className={styles.container}>
            <Navigation isBack={true} dark={false} onClick={()=>{return}}>쇼터디 멤버 관리</Navigation>
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
                                        handleOutMember={() => handleOutMember(member)} />
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
        </div>
    );
}