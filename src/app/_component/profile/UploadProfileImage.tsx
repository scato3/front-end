import Image from "next/image";
import styles from "./uploadProfile.module.css";
import ProfileModal from "./ProfileModal";
import ModalPortal from "../ModalPortal";
import ModalContainer from "../ModalContainer";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import useStore from "./profileStore";
import { useModal } from "@/hooks/useModal";

export default function UploadProfileImage() {
  const { previewImg } = useStore();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const handleImg = () => {
    handleOpenModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={handleImg}>
        <Image width={64} height={64} src={Icon} alt="파일 업로드" />
      </div>
      {previewImg && (
        <div className={styles.circularImageContainer}>
          <Image
            className={styles.circularImage}
            width={254}
            height={254}
            alt="미리보기 이미지"
            src={previewImg as string}
          />
        </div>
      )}
      {openModal && (
        <div className={styles.modalContainer}>
          <ModalPortal>
            <ModalContainer handleCloseModal={handleCloseModal}>
              <ProfileModal handleCloseModal={handleCloseModal} />
            </ModalContainer>
          </ModalPortal>
        </div>
      )}
    </div>
  );
}
