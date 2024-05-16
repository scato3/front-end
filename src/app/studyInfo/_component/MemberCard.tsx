import styles from "./memberCard.module.css";
import Image from "next/image";
import Badge_owner from "../../../../public/icons/studyInfo/badge_owner.svg";
import Icon from "../../../../public/icons/studyInfo/Ellipse 230.svg";

interface IMemberCard {
    nickname: string;
    profile: string;
    owner?: boolean;
    onClick: (nickname: string) => void;
}

export default function MemberCard({nickname, profile=Icon, owner=false, onClick}: IMemberCard){
    return(
        <div className={styles.container} onClick={() => onClick(nickname)}>
            <div className={styles.imageBox}>
                <Image className={styles.profileImage} src={profile} width={88} height={88} alt="image" />
            </div>
            {owner && <Image className={styles.badge} src={Badge_owner} width={32} height={32} alt="owner" />}
            <p className={owner ? styles.nickname : styles.nicknameMem}>{nickname}</p>
        </div>
    )
}