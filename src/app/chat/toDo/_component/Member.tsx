import styles from "./component.module.css";
import Image from "next/image";
import Icon from "../../../../../public/Profile.svg";

interface IMember {
    nickname: string;
}

export default function Member({nickname}:IMember){
    return(
        <div className={styles.MemberContainer}>
            <Image 
                className={styles.MemberProfileImg}
                src={Icon}
                width={68}
                height={68}
                onClick={()=>{ return}}
                alt="ProfileImage"
            />
            <p className={styles.MemberNickname}>{nickname}</p>
        </div>
    );
}