import Button from "@/app/_component/button/Button";
import styles from "../createStudy.module.css";
import Image from "next/image";
import { useState } from "react";

const icons = [
  {
    icon: "/icons/_main01/Icon_book.svg",
    active: "/icons/_main01/Icon_book_checked.svg",
    alt: "수능",
  },
  {
    icon: "/icons/_main01/Icon_language.svg",
    active: "/icons/_main01/Icon_language_checked.svg",
    alt: "어학",
  },
  {
    icon: "/icons/_main01/Icon_teach.svg",
    active: "/icons/_main01/Icon_teach_checked.svg",
    alt: "임용",
  },
  {
    icon: "/icons/_main01/Icon_coding.svg",
    active: "/icons/_main01/Icon_coding_checked.svg",
    alt: "코딩",
  },
  {
    icon: "/icons/_main01/Icon_company.svg",
    active: "/icons/_main01/Icon_company_checked.svg",
    alt: "취업",
  },
  {
    icon: "/icons/_main01/Icon_publicOfficial.svg",
    active: "/icons/_main01/Icon_publicOfficial_checked.svg",
    alt: "공무원",
  },
  {
    icon: "/icons/_main01/Icon_specialist.svg",
    active: "/icons/_main01/Icon_specialist_checked.svg",
    alt: "전문직",
  },
  {
    icon: "/icons/_main01/Icon_test.svg",
    active: "/icons/_main01/Icon_test_checked.svg",
    alt: "대학생",
  },
  {
    icon: "/icons/_main01/Icon_group.svg",
    active: "/icons/_main01/Icon_group_checked.svg",
    alt: "모각공",
  },
  {
    icon: "/icons/_main01/Icon_etc.svg",
    active: "/icons/_main01/Icon_etc_checked.svg",
    alt: "기타",
  },
];

export default function CheckField() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (icon: string) => {
    if (selectedIcon === icon) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(icon);
    }
  };

  return (
    <>
      <div className={styles.CheckContainer}>
        {icons.map((icon, index) => (
          <div
            key={index}
            className={`${styles.ImageContainer} ${selectedIcon === icon.active ? styles.Selected : ""}`}
            onClick={() => handleIconClick(icon.active)}
          >
            <Image src={selectedIcon === icon.active ? icon.active : icon.icon} alt={icon.alt} width={50} height={50} />
            <p className={`${styles.Category} ${selectedIcon === icon.active ? styles.SelectedCategory : ""}`}>
              {icon.alt}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.BtnContainer}>
        <Button size="large_main" property={selectedIcon !== null ? "confirm" : "disabled"} onClick={() => {}}>
          Step 1 완료
        </Button>
      </div>
    </>
  );
}
