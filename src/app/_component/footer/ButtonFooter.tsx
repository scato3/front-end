import styles from "./buttonFooter.module.css"
import Image from "next/image";
import Button from "../button/Button";
import Icon_heart from "../../../../public/icons/studyInfo/Icon_heart.svg";

export default function ButtonFooter({onClick}:{onClick: ()=>void}) {
    return(
        <div className={styles.container}>
            <Image src={Icon_heart} className={styles.icon} width={60} height={60} alt="찜"></Image>
            <Button property="default" size="large" onClick={()=>{onClick}}>가입하기</Button>
        </div>
    );
}