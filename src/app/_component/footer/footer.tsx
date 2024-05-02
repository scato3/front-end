import styles from "./footer.module.css";
import Image from "next/image";

interface IFooterProps {
  selectedIndex?: number;
}

const icons = [
  {
    default: "/icons/Icon_home.svg",
    checked: "/icons/Icon_home_check.svg",
    alt: "홈 페이지 이미지",
  },
  {
    default: "/icons/Icon_search.svg",
    checked: "/icons/Icon_search_check.svg",
    alt: "검색 페이지 이미지",
  },
  {
    default: "/icons/Icon_schedule.svg",
    checked: "/icons/Icon_schedule_check.svg",
    alt: "스케쥴 페이지 이미지",
  },
  {
    default: "/icons/Icon_profile.svg",
    checked: "/icons/Icon_profile_check.svg",
    alt: "프로필 페이지 이미지",
  },
];

export default function Footer({ selectedIndex = 0 }: IFooterProps) {
  const renderImages = () => {
    return icons.map((icon, index) => (
      <div key={index} className={styles.ImageContainer} onClick={() => {}}>
        <Image src={index === selectedIndex ? icon.checked : icon.default} alt={icon.alt} width={62} height={62} />
      </div>
    ));
  };

  return <div className={styles.Container}>{renderImages()}</div>;
}
