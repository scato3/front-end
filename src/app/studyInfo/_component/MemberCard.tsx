import styles from "./memberCard.module.css";
import Image from "next/image";
import Badge_owner from "../../../../public/icons/studyInfo/badge_owner.svg";
import Icon from "../../../../public/icons/studyInfo/Ellipse 230.svg";

interface IMemberCard {
    nickname: string;
    profile: string;
    owner?: boolean;
}

export default function MemberCard({nickname, profile=Icon, owner=false}: IMemberCard){
    return(
        <div className={styles.container}>
            <Image className={styles.profileImage} src={"icons/studyInfo/Ellipse 230.svg"} width={88} height={88} alt="image" />
            <Image className={styles.badge} src={Badge_owner} width={32} height={32} alt="owner" />
            <p className={styles.nickname}>{nickname}</p>
        </div>
    )
}