import styles from "./component.module.css";
import Image from "next/image";
import Icon from "../../../../../public/Profile.svg";
import useAuth from "@/hooks/useAuth";

interface IMemberCard {
    member: Imember;
    isOwner: boolean;
}

export default function Member({member, isOwner}:IMemberCard){
    const {user} = useAuth();

    return(
        <div className={styles.MemberContainer}>
            <div className={styles.ImgContainer}>
                <Image 
                    className={styles.ProfileImg}
                    src={member.profileImage}
                    width={68}
                    height={68}
                    onClick={()=>{ return}}
                    alt="ProfileImage"
                />
            </div>
            <p className={styles.MemberNickname}>{user?.nickname === member.nickname ? "나" : member.nickname}</p>
        </div>
    );
}