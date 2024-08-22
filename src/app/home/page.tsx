"use client";

import styles from "./home.module.css";
import Footer from "../_component/footer/footer";
import Image from "next/image";

import Card from "../_component/main_home/Card";
import Btn_arrow from "../../../public/icons/Btn_arrow_sm_right.svg";
import { useRouter } from "next/navigation";
import useFromStore from "@/utils/from";
import { useEffect, useState } from "react";
import { IfilterType } from "@/app/type/filterType";
import NoStudy from "../_component/noStudy/NoStudy";
import getFilter from "../api/getFilter";
import Loading from "../_component/Loading";
import useAuth from "@/hooks/useAuth";
import RequireLoginModal from "../_component/modal/requireLoginModal";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "../_component/ModalContainer";
import ModalPortal from "../_component/ModalPortal";
import Header from "../_component/header/Header";
import SpeedMatchingBtn from "./components/SpeedMatchingBtn";
import ButtonBox from "../_component/main_home/ButtonBox";
import Icon_make_study from "../../../public/icons/home/Icon_add_btn.svg";

export default function Main_home() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<IfilterType[]>([]);
  const { setFrom } = useFromStore();
  const router = useRouter();
  const { isLogin } = useAuth();
  const {
    handleOpenModal: handleOpenLoginModal,
    openModal: openLoginModal,
    handleCloseModal: handleCloseLoginModal,
  } = useModal();

  useEffect(() => {
    setFrom("home");
  }, []);

  useEffect(() => {
    const getPopular = async () => {
      try {
        const res = await getFilter("all", "recent");
        setPostData(res.data);
        console.log(res.data);
      } catch (e) {
        console.error("error");
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getPopular, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className={styles.container}>
            <div className={styles.speedBtnBox}>
              <SpeedMatchingBtn />
            </div>
            <div className={styles.ButtonBox}>
              <ButtonBox swiper={true} />
            </div>
            <div className={styles.ContentContainer}>
              <div className={styles.titleBox}>
                <p>신규 쇼터디</p>
                <div className={styles.moreContainer}>
                  <div className={styles.btnMore} onClick={() => router.push("./studyList")}>
                    더보기
                    <Image src={Btn_arrow} width={19} height={19} alt="더보기"></Image>
                  </div>
                </div>
              </div>
              <div className={styles.card}>
                {postData.length > 0 ? (
                  postData
                    .slice(0, 3)
                    .map((data, index) => <Card key={index} data={data} handleOpenModal={handleOpenLoginModal} />)
                ) : (
                  <div className={styles.NoStudy}>
                    <NoStudy>모집중인 쇼터디가 없어요...</NoStudy>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.footerBox}>
            <Footer />
          </div>
          {openLoginModal && (
            <ModalPortal>
              <ModalContainer handleCloseModal={handleCloseLoginModal}>
                <RequireLoginModal handleCloseModal={handleCloseLoginModal} />
              </ModalContainer>
            </ModalPortal>
          )}
        </>
      )}
    </>
  );
}
