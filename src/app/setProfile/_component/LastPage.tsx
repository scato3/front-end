import Button from "@/app/_component/button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Icon from "../../../../public/Profile_register_complete_check.svg";
import SubTitle from "../../../../public/titles/Profile_register_complete_subtitle.svg";
import Title from "../../../../public/titles/Profile_register_complete_title.svg";
import styles from "./lastPage.module.css";
export default function LastPage() {
  const router = useRouter();
  function handleButton() {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Image alt="프로필 등록 아이콘" src={Icon} />
        <Image alt="프로필 등록 타이틀" src={Title} className={styles.title} />
        <Image alt="프로필 등록 타이틀" src={SubTitle} className={styles.sub} />
      </div>
      <div className={styles.buttonBox}>
        <Button size="large" property={"default"} onClick={handleButton}>
          쇼터디 입장
        </Button>
      </div>
    </div>
  );
}
