import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";

interface IAlertModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export default function AlredyJoinModal({ handleCloseModal, children }: IAlertModal) {
  const handleClose = () => {
    handleCloseModal();
  };

  return (
    <div className={styles.AlertModalContainer}>
      <p className={styles.ModalContent}>{children}</p>
      <div className={styles.BtnContainer}>
        <Button size="small" property="default" onClick={handleClose}>
          확인
        </Button>
      </div>
    </div>
  );
}
