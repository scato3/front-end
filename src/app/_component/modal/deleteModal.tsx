import styles from "./alertModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";

interface IAlertModal {
    handleCloseModal: () => void;
    children: React.ReactNode;
}

export default function DeleteModal({ handleCloseModal, children }: IAlertModal) {

    return (
        <div className={styles.AlertModalContainer}>
        <p className={styles.ModalContent}>{children}</p>
        <div className={styles.BtnContainer}>
            <Button size="small" property="disabled" onClick={handleCloseModal}>
            취소
            </Button>
            <Button size="small" property="default" onClick={handleCloseModal}>
            삭제
            </Button>
        </div>
        </div>
    );
}
