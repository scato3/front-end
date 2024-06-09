import Button from "../button/Button";
import styles from "./requireLogin.module.css";
import { useRouter } from "next/navigation";

export default function RequireLoginModal ({handleCloseModal}:{handleCloseModal:()=>void}) {
    const router = useRouter();

    return (
        <div className={styles.Container}>
            <p className={styles.Content}>
                로그인이 필요한 서비스예요.
            </p>
            <div className={styles.BtnBox}>
                <Button property="cancel" size="small" onClick={handleCloseModal}>
                    취소
                </Button>
                <Button property="default" size="small" onClick={() => router.push("./login")}>
                    로그인
                </Button>
            </div>
        </div>
    );
}