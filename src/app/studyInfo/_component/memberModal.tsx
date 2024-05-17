import styles from "./memberModal.module.css";
import Image from "next/image";
import IconClose from "../../../../public/icons/studyInfo/Icon_close.svg";
import ProgressBar from "@/app/_component/progress_bar/progressBar";
import RatingBox from "@/app/_component/ratingBox/RatingBox";

interface ImemberModal {
    handleCloseModal: () => void ;
    user: IUserProfileType;
    study: IUserStudyType
}

export default function MemberModal({user, study, handleCloseModal}:ImemberModal) {

    return(
        <div className={styles.container}>
            <div className={styles.containerTop}>
                <p className={styles.name}>{user.nickname}</p>
                <Image className={styles.closeIcon} src={IconClose} width={36} height={36} alt="close" onClick={handleCloseModal}/>
            </div>
            <div className={styles.profileImageBox}>
                <Image className={styles.profileImage} src={user.profile_img} width={150} height={150} alt="profile"/>
            </div>
            <div className={styles.studyBox}>
                <p className={styles.studyType}>진행중</p>
                <p className={styles.studyNum}>{study.in_complete}</p>
                <p className={styles.studyType}>참여완료</p>
                <p className={styles.studyNum}>{study.in_progress}</p>
            </div>
            <div className={styles.ratingBox}>
                <RatingBox user={user}/>
            </div>
        </div>
    );
};