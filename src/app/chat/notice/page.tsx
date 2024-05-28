"use client"
import styles from "./notice.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navigation from "@/app/_component/navigation/page";
import { useState } from "react";
import IconEdit from "../../../../public/icons/chatting/Edit.svg";

export default function Notice(){
    const [isOwner, setIsOwner] = useState<boolean>(false);
    const router = useRouter();

    return(
        <div className={styles.container}>
            <Navigation
                isBack={true}
                dark={false}
                onClick={() => {
                    router.back()}}
            >
            <p>공지사항</p>
            {isOwner ? (
                <Image
                    className={styles.settingIcon}
                    src={IconEdit}
                    width={28}
                    height={28}
                    onClick={() => {return}}
                    alt="EditIcon"
                />
            ) : null}
            </Navigation>
            <div className={styles.hrOrange}></div>
            <div className={styles.contentContainer}>
                <p className={styles.notice}>공지사항입니다.</p>
            </div>
        </div>
    );
    
}