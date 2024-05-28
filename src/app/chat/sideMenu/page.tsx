"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import Navigation from "@/app/_component/navigation/page";
import styles from "./sidemenu.module.css";
import useDetailActiveStore from "../store/useSideMenuStore";
import useFromStore from "@/utils/from";
import Loading from "@/app/_component/Loading";
import { useModal } from "@/hooks/useModal";
import AlertModal from "@/app/_component/modal/alertModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";

const FILTERS = ["사진", "파일", "링크"];

export default function SideMenu() {
    const router = useRouter();
    const { accessToken } = useAuth();
    const { selectedInfo } = useDetailActiveStore();
    const [activeFilter, setActiveFilter] = useState<string>(FILTERS[selectedInfo - 1] || FILTERS[0]);
    const { openModal, handleOpenModal, handleCloseModal} = useModal();
    const { setFrom } = useFromStore();

    useEffect(() => {
        setFrom("chat/sideMenu");
    }, []);

    useEffect(() => {
    setActiveFilter(FILTERS[selectedInfo - 1] || FILTERS[0]);
    }, [selectedInfo]);

    const { isLoading } = useQuery({
    queryKey: ["SIDE_MENU"],
    queryFn: async () => {
        if (activeFilter === "사진") {
            return;
        } else if (activeFilter === "파일") {
            return;
        } else if (activeFilter === "링크") {
            return;
        } else {
            return;
        }
    },
    enabled: true,
    });

    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);

        if(filter != "사진") {
            handleOpenModal();
            setActiveFilter("사진");
        }
    };

    const getSeparatorPosition = () => {
        const index = FILTERS.indexOf(activeFilter);
        return `${(index / FILTERS.length) * 100}%`;
    };

    const getSeparatorWidth = () => {
        return `${100 / FILTERS.length}%`;
    };

    return (
        <div className={styles.Container}>
            {isLoading ? <><Loading /></> :
            <>
                <Navigation
                dark={false}
                isBack={true}
                onClick={() => {
                router.back();
                }}
            > 모아보기
            </Navigation>
            <div className={styles.DetailContainer}>
                {FILTERS.map((filter) => (
                <div
                    key={filter}
                    className={`${styles.FilterItem} ${activeFilter === filter ? styles.active : ""}`}
                    onClick={() => handleFilterClick(filter)}
                >
                    <p>{filter}</p>
                </div>
                ))}
            </div>
            <div className={styles.Separator}>
                <div
                    className={styles.ActiveSeparator}
                    style={{
                        width: getSeparatorWidth(),
                        left: getSeparatorPosition(),
                    }}
                ></div>
            </div>
            <div className={styles.ContentContainer}>
                <p className={styles.date}>2024-05-16</p>
                <div className={styles.imageBox}>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                </div>
                <p className={styles.date}>2024-05-16</p>
                <div className={styles.imageBox}>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                    <div className={styles.img}></div>
                </div>
            </div>
        </>}
            {openModal &&
                <ModalPortal>
                    <ModalContainer>
                        <AlertModal handleCloseModal={handleCloseModal}>업데이트 예정 서비스입니다.</AlertModal>
                    </ModalContainer>
                </ModalPortal>
            }
        </div>
    );
}
