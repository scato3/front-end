import styles from "./memberCard.module.css";
import Image from "next/image";
import Badge_owner from "../../../../public/icons/studyInfo/badge_owner.svg";
import Icon from "../../../../public/icons/studyInfo/Ellipse 230.svg";

interface IMemberCard {
    member: Imember;
    onClick: (nickname: string) => void;
}

export default function MemberCard({member, onClick}: IMemberCard){
    return(
        <div className={styles.container} onClick={() => onClick(member.nickname)}>
            <div className={styles.imageBox}>
                <Image className={styles.profileImage} src={member.profileImage} width={88} height={88} alt="image" />
            </div>
            {member._owner && <Image className={styles.badge} src={Badge_owner} width={32} height={32} alt="owner" />}
            <p className={styles.nickname}>{member.nickname}</p>
        </div>
    )
}