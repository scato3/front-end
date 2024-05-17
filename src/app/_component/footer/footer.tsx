import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.css";

interface IFooterProps {
  selectedIndex?: number;
}

const icons = [
  {
    default: "/icons/footer/Icon_home.svg",
    checked: "/icons/footer/Icon_home_check.svg",
    alt: "홈 페이지 이미지",
    value: "home",
  },
  {
    default: "/icons/Icon_search.svg",
    checked: "/icons/footer/Icon_search_check.svg",
    alt: "검색 페이지 이미지",
    value: "search",
  },
  {
    default: "/icons/footer/Icon_studyRoom.svg",
    checked: "/icons/footer/Icon_studyRoom_check.svg",
    alt: "studyRooms",
  },
  {
    default: "/icons/footer/Icon_profile.svg",
    checked: "/icons/footer/Icon_profile_check.svg",
    alt: "프로필 페이지 이미지",
    value: "profile",
  },
];

export default function Footer({ selectedIndex = 0 }: IFooterProps) {
  return (
    <div className={styles.Container}>
      {icons.map((icon, index) => (
        <Link key={index} href={`./${icon.value}`}>
          <div className={styles.ImageContainer}>
            <Image src={index === selectedIndex ? icon.checked : icon.default} alt={icon.alt} width={54} height={54} />
          </div>
        </Link>
      ))}
    </div>
  );
}
