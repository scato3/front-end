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
    const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

    const handleSelectReason = (reason: string) => {
        if (selectedReasons.includes(reason)) {
            setSelectedReasons(selectedReasons.filter(r => r !== reason));
            setExitReasons(exitReasons.filter(r => r !== reason));
        } else {
            setSelectedReasons([...selectedReasons, reason]);
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
                        className={`${styles.reason} ${selectedReasons.includes(reason) ? styles.selected : ""}`} 
                        onClick={() => handleSelectReason(reason)}
                    >
                        {reason}
                    </div>
                )}
            </div>
            <div className={styles.btn}>
                <Button size="small" onClick={handleOutMember}>확인</Button>
            </div>
        </div>
    );
}
