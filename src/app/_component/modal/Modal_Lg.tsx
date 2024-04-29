import styles from "./modal.module.css";
import Button from "../button/Button";

interface IModalLgConfirmProps {
  children: React.ReactNode;
}

export default function Modal_Lg_Confirm({ children }: IModalLgConfirmProps) {
  return (
    <div className={styles.container}>
      <div className={styles.modalLargeBox}>
        {children}
        <Button size="small" text="인증하기" property="default" onClick={() => {}}></Button>
      </div>
    </div>
  );
}
