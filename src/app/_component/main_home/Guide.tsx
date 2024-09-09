import Button from "../button/Button";
import styles from "./guide.module.css";

interface GuideProps {
  onClick: () => void;
  children?: React.ReactNode;
}

export default function Guide({ onClick, children }: GuideProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
      <Button onClick={onClick}>쇼터디 가입하기</Button>
    </div>
  );
}
