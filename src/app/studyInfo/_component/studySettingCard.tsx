import styles from "./studySetting.module.css";
import Image from "next/image";
import Icon_duration from "../../../../public/icons/studyInfo/Icon_기간.svg";
import Icon_memberCount from "../../../../public/icons/studyInfo/Icon_인원.svg";
import Icon_tendency from "../../../../public/icons/studyInfo/Icon_분위기.svg";
import { useEffect, useState } from "react";

interface IStudySettingCard {
    type: string;
    descript: string;
}

const setting = [
    {
        alt: "기간",
        src: "icons/studyInfo/Icon_기간.svg",
    },
    {
        alt: "인원",
        src: "icons/studyInfo/Icon_인원.svg",
    },
    {
        alt: "분위기",
        src: "icons/studyInfo/Icon_분위기.svg",
    },
]

export default function StudySettingCard({type, descript}:IStudySettingCard) {
    const [ src, setSrc ] = useState<string>("");
    const [ name, setName ] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case "기간":
                setSrc(setting[0].src);
                setName(setting[0].alt);
                break;
            case "인원":
                setSrc(setting[1].src);
                setName(setting[1].alt);
                break;
            case "분위기":
                setSrc(setting[2].src);
                setName(setting[2].alt);
                break;
        }
    }, []);

    return(
        <div className={styles.container}>
            <div className={styles.leftBox}>
            {src && <Image className={styles.icon} src={src} width={24} height={24} alt={name} />}
            <p className={styles.name}>{name}</p>
            </div>
            <p className={styles.info}>{descript}</p>
        </div>
    )

}