"use client";

import styles from "./setting.module.css";
import Navigation from "../_component/navigation/page";
import Image from "next/image";
import Icon from "../../../public/icons/Btn_arrow_sm.svg";
import DeleteStudy from "../api/deleteStudy";
import DeleteModal from "../_component/modal/deleteModal";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import GetJoinRequestCount from "../api/getJoinRequestCount";
import { useQuery } from "@tanstack/react-query";

export default function StudySetting() {
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const studyIdString = searchParams.get("studyId");
  const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
  const { accessToken } = useAuth();
  const [ membersCount, setMembersCount ] = useState<number>(0);

  const { data } = useQuery({
    queryKey: ["KAKAO_CODE"],
    queryFn: async () => GetJoinRequestCount(studyId, accessToken),
  });

  useEffect(() => {
    if(data){
      setMembersCount(data.data);
    }
  },[data])

  const handleDeleteStudy = async () => {
    try {
      const res = await DeleteStudy(studyId, accessToken);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    console.log(`id=${studyId} study Deleted`);
    handleCloseModal();
    router.push("/studyList");
  };


  return (
    <div className={styles.container}>
      <Navigation
        isBack={true}
        dark={false}
        onClick={() => {
          router.push(`./studyInfo?studyId=${studyId}`);
        }}
      >
        쇼터디 설정
      </Navigation>
      <div className={styles.hr}> </div>
      <div className={styles.contentsBox}>
        <p className={styles.h1}>쇼터디 정보</p>
        <div className={styles.menuBox}>
          <p className={styles.menu} onClick={() => router.push(`/studyEdit?studyId=${studyId}`)}>
            수정하기
            <Image className={styles.icon} src={Icon} width={16} height={16} alt="arrow" />
          </p>
          <p className={styles.menu} onClick={() => router.push(`/studyMember?studyId=${studyId}`)}>
            멤버관리
            {membersCount ? <div className={styles.count}>{membersCount}+</div> : null}
            <Image className={styles.icon} src={Icon} width={16} height={16} alt="arrow" />
          </p>
          <p className={styles.menu} onClick={handleOpenModal}>
            쇼터디 삭제
            <Image className={styles.icon} src={Icon} width={16} height={16} alt="arrow" />
          </p>
        </div>
      </div>

      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <DeleteModal handleCloseModal={handleCloseModal} handleDelete={handleDeleteStudy}>
              쇼터디를 삭제하시겠어요?
            </DeleteModal>
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
