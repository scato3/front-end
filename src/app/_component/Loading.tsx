import styles from "./loading.module.css";
import Image from "next/image";
import Icon from "../../../public/icons/loadingIcon.svg";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Image className={styles.icon} 
                src={Icon}
                width={36}
                height={36}
                alt="Loading"
            />
        </div>
    );
}