import styles from "./shortcut.module.css";
import Image from "next/image";

const shortCutIcons = [
  {
    path: "/icons/search/Icon_all.svg",
    alt: "전체",
    ref: "all",
  },
  {
    path: "/icons/search/Icon_clock.svg",
    alt: "마감임박",
    ref: "deadline",
  },
  {
    path: "/icons/search/Icon_recent.svg",
    alt: "신규",
    ref: "recent",
  },
  {
    path: "/icons/search/Icon_accept.svg",
    alt: "승인없는",
    ref: "quick",
  },
];

interface IShortCutIconsProps {
  handleShortcut: (ref: string) => void;
}

export default function ShortcutIcons({ handleShortcut }: IShortCutIconsProps) {
  return (
    <div className={styles.Container}>
      {shortCutIcons.map((icon, index) => (
        <div>
          <div className={styles.IconBackground}>
            <Image
              onClick={() => handleShortcut(icon.ref)}
              className={styles.icon}
              key={index}
              src={icon.path}
              width={40}
              height={40}
              alt={icon.alt}
            />
          </div>
          <p className={styles.BtnName}>{icon.alt}</p>
        </div>
      ))}
    </div>
  );
}
