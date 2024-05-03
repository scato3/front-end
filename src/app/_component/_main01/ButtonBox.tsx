import styles from "./buttonBox.module.css";
import Image from "next/image";
import Link from "next/link";

interface IFooterProps {
    selectedIndex?: number;
}

const icons = [
    {
        icon: "/icons/_main01/Icon_book.svg",
        alt: "수능",
    },
    {
        icon: "/icons/_main01/Icon_language.svg",
        alt: "어학",
    },
    {
        icon: "/icons/_main01/Icon_company.svg",
        alt: "취업",
    },
    {
        icon: "/icons/_main01/Icon_publicOfficial.svg",
        alt: "공무원",
    },
    {
        icon: "/icons/_main01/Icon_teach.svg",
        alt: "임용",
    },
    {
        icon: "/icons/_main01/Icon_coding.svg",
        alt: "코딩",
    },
    {
        icon: "/icons/_main01/Icon_specialist.svg",
        alt: "전문직",
    },
    {
        icon: "/icons/_main01/Icon_test.svg",
        alt: "대학생",
    }
    ];

    export default function Footer() {
    return (
        <div className={styles.container}>
        {icons.map((icon, index) => (
            <div className={styles.imageContainer}>
                <Link key={index} href={"./"}>
                    <Image src={icon.icon} alt={icon.alt} width={48} height={48} />  
                </Link>
                <p className={styles.category}>{icon.alt}</p>
            </div>
        ))}
        </div>
    );
}
