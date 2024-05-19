import styles from "./memberCard.module.css";
import Image from "next/image";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import { useEffect, useState } from "react";
import Button from "@/app/_component/button/Button";
import moment from "moment";

interface IMemberCard {
    isRequesting?: boolean;
    isAccepted?: boolean;
    isDeclined?: boolean;
    isRequest?: boolean;
    isMember?: boolean;
    memberData?: IJoinedMember;
    requestData?: IRequestMember;
    handleOutMember?: () => void;
    handleAcceptRequest?: () => void;
    handleDeclineRequest?: () => void;
}

export default function MemberCard({isDeclined, isAccepted,isRequesting, isRequest=false, isMember=false, 
    memberData, requestData, handleOutMember, handleAcceptRequest, handleDeclineRequest}: IMemberCard) {
    const formattedDate =  moment(memberData?.join_date).format("MM-DD HH:MM");
    const formattedReqDate = moment(requestData?.request_date).format("MM-DD HH:MM");
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [hoursRemaining, setHoursRemaining] = useState<number | null>(null);
    const [ src, setSrc ] = useState<string>(Icon);

    useEffect(() => {
        if(isRequest){
            setSrc(requestData?.profile_image ?? Icon);
        } else {
            setSrc(memberData?.profile_image ?? Icon);
        }
    });

    useEffect(() => {
        if (isRequest) {
            setSrc(requestData?.profile_image ?? Icon);
        } else {
            setSrc(memberData?.profile_image ?? Icon);
        }

        if (requestData?.request_date) {
            const requestTime = moment(requestData.request_date);
            const nowTime = moment();
            const duration = moment.duration(requestTime.add(72, 'hours').diff(nowTime));
            const hours = duration.asHours();
            setHoursRemaining(hours > 0 ? Math.ceil(hours) : 0);
        }
    }, [isRequest, requestData, memberData]);

    return(
        <div className={isRequesting? styles.container : styles.done}>
            <div className={styles.imgContainer}>
                <Image src={src} onClick={()=>{}} width={80} height={80} alt="ProfileImage" />
            </div>
            <div className={styles.rightBox}>
                {isRequest ? <p className={styles.nickname}>{requestData?.nickname}님이 함께하길 원하고 있어요</p>
                    : <p className={styles.nickname}>{memberData?.nickname}</p>}
                <div className={styles.secondRowBox}>
                    <p className={styles.time}>{isMember ? formattedDate : formattedReqDate}</p>
                    {(isRequest && isRequesting) && <p className={styles.msg}>{hoursRemaining}시간 후 자동 거절</p>}
                    {(isRequest && isAccepted && <Button size="very_small" property="disabled">수락완료</Button>)}
                    {(isRequest && isDeclined && <Button size="very_small" property="disabled">거절완료</Button>)}
                    {isMember && <Button size="very_small" property="default" onClick={handleOutMember}>내보내기</Button>}
                </div>
                {isRequesting && (
                <div className={styles.thirdRowBox}>
                    <Button size="very_small" onClick={handleDeclineRequest}>거절</Button>
                    <Button size="very_small" onClick={handleAcceptRequest}>수락</Button>
                </div>)}
            </div>
        </div>
    )
}