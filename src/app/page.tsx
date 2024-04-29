"use client";

import Login from "./login/page";
import Button from "./_component/button/Button";
import Modal_Lg from "./_component/modal/Modal_Lg";
import Modal_Md from "./_component/modal/Modal_Md";

import styles from "./_component/modal/modal.module.css";

export default function Home() {
  return (
    <div>
      <Login />
      <br />
      <Button
        size="large"
        text="스터디 만들기"
        onClick={() => {
          return;
        }}
      />
      <br />
      <Button
        text="가입하기"
        property="confirm"
        onClick={() => {
          return;
        }}
      />
      <br />
      <Button
        size="small"
        text="가입하기"
        property="pressed"
        onClick={() => {
          return;
        }}
      />
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
    </div>
  );
}
