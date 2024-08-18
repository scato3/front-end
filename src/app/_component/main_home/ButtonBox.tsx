import styles from "./buttonBox.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Slider from "react-slick";

import "../../../styles/slick-theme.css";

import Icon_left from "../../../../public/icons/categoryIcons/left_active.svg";
import Icon_left_disabled from "../../../../public/icons/categoryIcons/left_disabled.svg";
import Icon_right from "../../../../public/icons/categoryIcons/right_active.svg";
import Icon_right_disabled from "../../../../public/icons/categoryIcons/right_disabled.svg";

const icons = [
  {
    icon: "/icons/categoryIcons/탐색하기.svg",
    alt: "탐색하기",
  },
  {
    icon: "/icons/categoryIcons/수능.svg",
    alt: "수능",
  },
  {
    icon: "/icons/categoryIcons/대학생.svg",
    alt: "대학생",
  },
  {
    icon: "/icons/categoryIcons/취업.svg",
    alt: "취업",
  },
  {
    icon: "/icons/categoryIcons/전문직.svg",
    alt: "전문직",
  },
  {
    icon: "/icons/categoryIcons/어학.svg",
    alt: "어학",
  },
  {
    icon: "/icons/categoryIcons/자격증.svg",
    alt: "자격증",
  },
  {
    icon: "/icons/categoryIcons/코딩.svg",
    alt: "코딩",
  },
  {
    icon: "/icons/categoryIcons/공무원.svg",
    alt: "공무원",
  },
  {
    icon: "/icons/categoryIcons/임용.svg",
    alt: "임용",
  },
  {
    icon: "/icons/categoryIcons/모각공.svg",
    alt: "모각공",
  },
  {
    icon: "/icons/categoryIcons/기타.svg",
    alt: "기타",
  },
];

interface IButtonBoxProps {
  swiper: boolean;
}

export default function ButtonBox({ swiper }: IButtonBoxProps) {
  const router = useRouter();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Image src={Icon_right} width={40} height={40} alt="next" />,
    prevArrow: <Image src={Icon_left} width={40} height={40} alt="before" />,
  };

  return (
    <>
      {swiper ? (
        <div className={styles.swiperContainer}>
          <Slider {...settings}>
            <div>
              <div className={styles.iconRow}>
                {icons.slice(0, 8).map((icon, index) => (
                  <div className={styles.iconItem} key={index}>
                    <Image src={icon.icon} alt={icon.alt} width={57} height={54} />
                    <p className={styles.category}>{icon.alt}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className={styles.iconRowSecond}>
                {icons.slice(8, 12).map((icon, index) => (
                  <div className={styles.iconItem} key={index}>
                    <Image src={icon.icon} alt={icon.alt} width={57} height={54} />
                    <p className={styles.category}>{icon.alt}</p>
                  </div>
                ))}
              </div>
            </div>
          </Slider>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
