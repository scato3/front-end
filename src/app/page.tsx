"use client";

import Login from "./login/page";
import Button from "./_component/button/Button";
import Modal_Lg from "./_component/modal/Modal_Lg";
import Modal_Md from "./_component/modal/Modal_Md";
import Filter from "./_component/filter/Filter";
import Input_Chat from "./_component/input/Input_Chat";
import Footer from "./_component/footer/footer";
import Toggle from "./_component/toggle/toggle";
import Navigation from "./_component/navigation/page";

import styles from "./_component/modal/modal.module.css";

export default function Home() {
  return (
    <div>
      <Login />
      <br />
      <Button
        size="large"
        onClick={() => {
          return;
        }}
      >
        이렇게
      </Button>
      <br />
      <Button
        property="confirm"
        onClick={() => {
          return;
        }}
      >
        쓰면
      </Button>
      <br />
      <Button
        size="small"
        property="pressed"
        onClick={() => {
          return;
        }}
      >
        되요
      </Button>
      <br />
      <Modal_Lg>
        <p className={styles.contentTop}>중간 사진 인증 시간입니다.</p>
        <p className={styles.contentBottom}>
          제한 시간 <span className={styles.contentSpan}>1분</span>
        </p>
      </Modal_Lg>
      <br />
      <Modal_Md>
        <p className={styles.contentTop}>쇼터디를 종료할까요?</p>
      </Modal_Md>
      <br />
      <Filter
        size="large"
        property="deep"
        onClick={() => {
          return;
        }}
      >
        필터도
      </Filter>
      <br />
      <Filter
        size="medium"
        property="light"
        onClick={() => {
          return;
        }}
      >
        마찬
      </Filter>
      <br />
      <Filter
        size="small"
        property="disabled"
        onClick={() => {
          return;
        }}
      >
        가지구요
      </Filter>
      <br />
      <Input_Chat />
      <br />
      <Footer />
      <Footer selectedIndex={1} />
      <Footer selectedIndex={2} />
      <Footer selectedIndex={3} />
      <br />
      <Toggle />
      <br />
      <Navigation onClick={() => {}} isSearch={true}>
        프로필 등록
      </Navigation>
      <br />
    </div>
  );
}
