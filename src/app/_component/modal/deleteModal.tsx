import styles from "./deleteModal.module.css";
import Button from "@/app/_component/button/Button";
import { useRouter } from "next/navigation";

interface IAlertModal {
    handleCloseModal: () => void;
    children: React.ReactNode;
    handleDelete: () => void;
}

export default function DeleteModal({ handleCloseModal, children, handleDelete }: IAlertModal) {

    return (
        <div className={styles.DeleteModalContainer}>
        <p className={styles.ModalContent}>{children}</p>
            <div className={styles.BtnContainer}>
                <button className={styles.btnCancel} onClick={handleCloseModal}>
                취소
                </button>
                <button className={styles.btnDelete} onClick={handleDelete}>
                삭제
                </button>
            </div>
        </div>
    );
}
