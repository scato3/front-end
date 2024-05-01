import styles from "./modal.module.css";
import Button from "../button/Button";

interface IModalLgConfirmProps {
  children: React.ReactNode;
}

export default function Modal_Lg({ children }: IModalLgConfirmProps) {
  return (
    <div className={styles.container}>
      <div className={styles.modalLargeBox}>
        {children}
        <Button size="small" property="default" onClick={() => {}}>
          인증하기
        </Button>
      </div>
    </div>
  );
}
