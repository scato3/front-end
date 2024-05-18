import styles from "./logout.module.css";
import Button from "../button/Button";
import { ICloseModalProps } from "@/app/type/closeModalType";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Logout({ handleCloseModal }: ICloseModalProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    handleCloseModal();
    router.push("./");
  };

  return (
    <div className={styles.Container}>
      <p>로그아웃 할까요?</p>
      <div className={styles.BtnContainer}>
        <Button size="small" property="cancel" onClick={handleCloseModal}>
          취소
        </Button>
        <Button size="small" property="default" onClick={handleLogout}>
          확인
        </Button>
      </div>
    </div>
  );
}
