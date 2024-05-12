import styles from "./searchTag.module.css";
import IconX from "../../../../public/icons/search/Icon_X.svg";
import Image from "next/image";

export default function SearchTag({children}:{children:React.ReactNode}) {
    const handeldelete = () => {

    }

    return(
        <div className={styles.container}>
            <p className={styles.tag}>{children}</p>
            <Image 
                src={IconX}
                width={24}
                height={24}
                className={styles.icon}
                alt="X"
                onClick={handeldelete}
            />
        </div>
    );
}