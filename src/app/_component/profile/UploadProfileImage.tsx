
import Image from "next/image";
import styles from './uploadProfile.module.css';
import ProfileModal from "./ProfileModal";
import ModalPortal from "../ModalPortal";
import ModalContainer from "../ModalContainer";
import Icon from '../../../../public/icons/Icon_set_profile.svg'
import useStore from "./profileStore";
import { useState } from "react";

export default function UploadProfileImage() {
    const postImg = useStore((state) => state.postImg);
    const previewImg = useStore((state) => state.previewImg);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    
    return(
        <div className={styles.container}>
            <div className={styles.icon}>
                <Image 
                    width={64}
                    height={64}
                    src={Icon}
                    alt="파일 업로드" 
                    onClick={toggleModal}
                    />
            {isModalOpen && (
                <div className={styles.modalContainer}>
                    <ModalPortal>
                        <ModalContainer handleCloseModal={toggleModal}>
                            <ProfileModal />
                        </ModalContainer>
                    </ModalPortal>
                </div>
            )}
            </div>
            {previewImg && (
                <Image 
                    width={254} 
                    height={254} 
                    alt="/Profile.svg" 
                    src={previewImg as string} 
                />
            )}
        </div>
    );
}