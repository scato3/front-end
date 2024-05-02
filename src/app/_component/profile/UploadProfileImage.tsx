import Image from "next/image";
import styles from "./uploadProfile.module.css";
import ProfileModal from "./ProfileModal";
import ModalPortal from "../ModalPortal";
import ModalContainer from "../ModalContainer";
import Icon from "../../../../public/icons/Icon_set_profile.svg";
import useStore from "./profileStore";
import { useModal } from "@/hooks/useModal";

export default function UploadProfileImage() {
  const postImg = useStore((state) => state.postImg);
  const previewImg = useStore((state) => state.previewImg);
  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const handleImg = () => {
    handleOpenModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon} onClick={handleImg}>
        <Image width={64} height={64} src={Icon} alt="파일 업로드" />
      </div>
      {previewImg && <Image width={254} height={254} alt="/Profile.svg" src={previewImg as string} />}
      {openModal && (
        <div className={styles.modalContainer}>
          <ModalPortal>
            <ModalContainer handleCloseModal={handleCloseModal}>
              <ProfileModal />
            </ModalContainer>
          </ModalPortal>
        </div>
      )}
    </div>
  );
}
