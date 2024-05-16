import styles from "./memberModal.module.css";
import Image from "next/image";
import IconClose from "../../../../public/icons/Icon_X.svg";
import GetUserProfile from "@/app/api/getUserProfile";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface ImemberModal {
    nickname: string;
    handleCloseModal: () => void ;
}

export default function MemberModal({nickname, handleCloseModal}:ImemberModal) {
    
    return(
        <div className={styles.container}>
            <div className={styles.header}>
                <p className={styles.name}></p>
                <Image src={IconClose} width={36} height={36} alt="close" onClick={handleCloseModal}/>
            </div>
            <Image className={styles.profileImage} src={""} width={150} height={150} alt="profile"/>
        </div>
    );
};