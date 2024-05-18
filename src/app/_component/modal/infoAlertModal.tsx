import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";

interface IAlertModal {
  handleCloseModal: () => void;
  children: React.ReactNode;
}

export default function InfoAlertModal({ handleCloseModal, children }: IAlertModal) {
  const router = useRouter();
  const { from } = useFromStore();

  const handleClose = () => {
    handleCloseModal();
    router.push(`./${from}`);
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
