import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";

interface IAlertModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
  studyId: number;
  accessToken: string;
}

export default function AlertModal({ handleCloseModal, children, studyId, accessToken }: IAlertModal) {
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
