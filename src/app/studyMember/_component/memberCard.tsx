import styles from "./memberCard.module.css";
import Image from "next/image";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import { useState } from "react";
import Button from "@/app/_component/button/Button";
import moment from "moment";

interface IMemberCard {
    isRequesting?: boolean;
    isRequest?: boolean;
    isMember?: boolean;
    memberData: IJoinedMember;
    handleOutMember: () => void;
    handleOpenOutModal: () => void;
}

export default function MemberCard({isRequesting=false, isRequest=false, isMember=false, memberData, handleOutMember, handleOpenOutModal}: IMemberCard) {
    const formattedDate =  moment(memberData.join_date).format("MM-DD HH:MM");


    return(
        <div className={isRequesting? styles.container : styles.done}>
            <div className={styles.imgContainer}>
                <Image src={memberData.profile_image} onClick={()=>{}} width={80} height={80} alt="ProfileImage" />
            </div>
            <div className={styles.rightBox}>
                {isRequesting ? <p className={styles.nickname}>{memberData.nickname}님이 함께하길 원하고 있어요</p>
                    : <p className={styles.nickname}>{memberData.nickname}</p>}
                <div className={styles.secondRowBox}>
                    <p className={styles.time}>{formattedDate}</p>
                    {(isRequest && isRequesting) && <p className={styles.msg}>시간 후 자동 거절</p>}
                    {(isRequest && <Button size="very_small" property="disabled">수락완료</Button>)}
                    {isMember && <Button size="very_small" property="default" onClick={handleOutMember}>내보내기</Button>}
                </div>
                {isRequesting && (
                <div className={styles.thirdRowBox}>
                    <Button size="very_small">거절</Button>
                    <Button size="very_small">수락</Button>
                </div>)}
            </div>
        </div>
    )
}