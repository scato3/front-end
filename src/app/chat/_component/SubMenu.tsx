import styles from "./submenu.module.css";
import Close from "../../../../public/icons/Icon_close.svg";
import Right from "../../../../public/icons/Btn_arrow_right.svg";
import Out from "../../../../public/icons/Icon_out.svg";
import Image from "next/image";
import { ICloseModalProps } from "@/app/type/closeModalType";

const menuItems = [{ label: "목표관리" }, { label: "공지사항" }, { label: "사진" }, { label: "멤버" }];

export default function Submenu({ handleCloseModal }: ICloseModalProps) {
  return (
    <>
      <div className={styles.SubmenuContainer}>
        <div className={styles.SubNavigation}>
          <p>스터디 캔버스</p>
          <Image
            src={Close}
            width={36}
            height={36}
            alt="Close Button"
            onClick={handleCloseModal}
            className={styles.CloseImg}
          />
        </div>
        <div className={styles.SubContentContainer}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.ItemContainer} ${index !== menuItems.length - 1 ? "" : styles.LastItem}`}
            >
              <div className={styles.Object}>{item.label}</div>
              <Image src={Right} width={16} height={16} alt="Right Button" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.SubFooter}>
        <p>스터디 나가기</p>
        <Image src={Out} width={36} height={36} alt="나가기" className={styles.OutImg} />
      </div>
    </>
  );
}
