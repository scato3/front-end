import styles from "./searchTag.module.css";
import IconX from "../../../../public/icons/search/Icon_X.svg";
import Image from "next/image";

interface IsearchTag {
    isLogin?: boolean;
    handleDelete: () => void;
    children: React.ReactNode;
    goKeyword: () => void;
}

export default function SearchTag({handleDelete, children, goKeyword}:IsearchTag) {

    return(
        <div className={styles.container}>
            <p className={styles.tag} onClick={goKeyword}>{children}</p>
        <Image 
                src={IconX}
                width={24}
                height={24}
                className={styles.icon}
                alt="X"
                onClick={handleDelete}
            />
        </div>
    );
}