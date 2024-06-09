import styles from "./buttonFooter.module.css"
import Image from "next/image";
import Button from "../button/Button";
import Icon_heart from "../../../../public/icons/studyInfo/Icon_heart.svg";
import Icon_heart_active from "../../../../public/icons/studyInfo/Icon_heart_active.svg";
import AddFavoriteStudy from "@/app/api/addFavStudy";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import DeleteFavoriteStudy from "@/app/api/deleteFavStudy";

interface IButtonFooter {
    study_id : number;
    onClick: () => void;
    children: React.ReactNode;
    isFav: boolean;
    setIsFav: React.Dispatch<React.SetStateAction<boolean>>;
    handleOpenLoginModal?: () => void;
} 

export default function ButtonFooter({study_id, onClick, children, isFav, setIsFav, handleOpenLoginModal=()=>{return} }:IButtonFooter) {
    const { accessToken, isLogin} = useAuth();

    useEffect(() => {
        if(isFav && isLogin){
            setIsFav(true);
        }else{
            setIsFav(false);
        }
    }, []);

    const addFav = async() => {
        try{
            await AddFavoriteStudy(study_id, accessToken);
            console.log(`Add Favorite ${study_id}`);
        }catch(error){
            console.log(error);
        }
    }

    const DeleteFav = async() => {
        try{
            await DeleteFavoriteStudy(study_id, accessToken);
            setIsFav(false);
            console.log(`Delete Favorite ${study_id}`);
        }catch(error){
            console.log(error);
        }
    }

    const toggleFavStudy = () => {
        if(isLogin){
            if(isFav){
                setIsFav(false);
                DeleteFav();
            }else {
                setIsFav(true);
                addFav();
            }
        }else{
            handleOpenLoginModal();
        }
    };

    return(
        <div className={styles.container}>
            <Image src={isFav? Icon_heart_active : Icon_heart} className={styles.icon} width={60} height={60} alt="찜" onClick={toggleFavStudy} />
            <Button property="default" size="large" onClick={onClick}>{children}</Button>
        </div>
    );
}