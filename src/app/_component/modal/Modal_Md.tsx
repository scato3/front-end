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
          <Button size="small" property="disabled" onClick={() => {}}>
            인증하기
          </Button>
          <Button size="small" onClick={() => {}}>
            종료
          </Button>
        </div>
      </div>
    </div>
  );
}
