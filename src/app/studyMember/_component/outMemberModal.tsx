import styles from "./outMemberModal.module.css";
import X_Icon from "../../../../public/icons/Icon_close_.svg";
import Image from "next/image";
import Button from "@/app/_component/button/Button";
import useMemberStore from "../store/useMemberStore";
import { useState } from "react";

interface IOutMemberModal {
    handleCloseModal: () => void;
    handleOutMember: () => void;
}

const reasons = [
    "과도한 비방 혹은 욕설",
    "홍보성 메시지",
    "목적 외 쇼터디 사용",
    "쇼터디 참여율 저조"
]

export default function OutMemberModal({handleCloseModal, handleOutMember}:IOutMemberModal) {
    const { exitReasons, setExitReasons, outMemberName } = useMemberStore();

    const handleSelectReason = (reason: string) => {
        if (exitReasons.includes(reason)) {
            setExitReasons(exitReasons.filter(r => r !== reason));
        } else {
            setExitReasons([...exitReasons, reason]);
        }
    };

    return(
        <div className={styles.container}>
            <p className={styles.nickname}>{outMemberName}</p>
            <Image className={styles.XIcon} src={X_Icon} width={36} height={36} alt="X" onClick={handleCloseModal} />
            <div className={styles.desciptBox}>
                <p className={styles.descript}>회원 퇴출 이유를 선택해 주세요</p>
                <p className={styles.descript}>(중복 선택 가능)</p>
            </div>
            <div className={styles.reasonsBox}>
                {reasons.map((reason, index) => 
                    <div 
                        key={index} 
                        className={`${styles.reason} ${exitReasons.includes(reason) ? styles.selected : ""}`} 
                        onClick={() => handleSelectReason(reason)}
                    >
                        {reason}
                    </div>
                )}
            </div>
            <div className={styles.btn}>
                <Button size="small" property={exitReasons.length != 0 ? "default" : "disabled"}  onClick={handleOutMember}>확인</Button>
            </div>
        </div>
    );
}
