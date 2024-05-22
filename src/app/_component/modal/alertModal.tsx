import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";

interface IAlertModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export default function AlertModal({ handleCloseModal, children}: IAlertModal) {
  const router = useRouter();

  return (
    <div className={styles.AlertModalContainer}>
      <p className={styles.ModalContent}>{children}</p>
      <div className={styles.BtnContainer}>
        <Button size="small" property="default" onClick={handleCloseModal}>
          확인
        </Button>
      </div>
    </div>
  );
}
