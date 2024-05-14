import styles from "./nav.module.css";
import Icon_close from "../../../../../public/icons/Icon_close.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IModelFilterProps {
  handleCloseModal: () => void;
}

export default function FilterNav({ handleCloseModal }: IModelFilterProps) {
  const router = useRouter();
  return (
    <div className={styles.FilterContainer}>
      <p>상세 필터</p>
      <Image
        src={Icon_close}
        width={30}
        height={30}
        alt="종료 버튼"
        onClick={() => {
          handleCloseModal();
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
