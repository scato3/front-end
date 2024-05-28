import styles from "./component.module.css";
import Image from "next/image";
import Icon from "../../../../../public/Profile.svg";
import useAuth from "@/hooks/useAuth";
import useToDoStore from "../../store/useToDoStore";

interface IMemberCard {
    member: Imember;
    handleMemberClick: () => void;
}

export default function Member({member, handleMemberClick}:IMemberCard){
    const {watchNickname} = useToDoStore();
    const {user} = useAuth();

    return(
        <div className={styles.MemberContainer}>
            <div className={watchNickname === member.nickname ? 
                `${styles.ImgContainer} ${styles.active}` : styles.ImgContainer}>
                <Image 
                    src={member.profileImage}
                    width={68}
                    height={68}
                    onClick={handleMemberClick}
                    alt="ProfileImage"
                />
            </div>
            <p className={styles.MemberNickname}>{user?.nickname === member.nickname ? "나" : member.nickname}</p>
        </div>
    );
}