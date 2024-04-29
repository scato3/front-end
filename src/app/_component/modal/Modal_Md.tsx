import styles from "./modal.module.css";
import Button from "../button/Button";

interface IModalMdProps {
  children: React.ReactNode;
}

export default function Modal_Md({ children }: IModalMdProps) {
  return (
    <div className={styles.container}>
      <div className={styles.modalMiddleBox}>
        {children}
        <div className={styles.twoButtonBox}>
          <Button size="small" text="인증하기" property="disabled" onClick={() => {}}></Button>
          <Button size="small" text="종료" onClick={() => {}}></Button>
        </div>
      </div>
    </div>
  );
}
