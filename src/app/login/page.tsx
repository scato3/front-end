"use client";

import Image from "next/image";
import styles from "./login.module.css";

import Logo from "../../../public/Brand_logo.svg";
import kakaoLogin from "../../../public/kakao_login_large_wide.svg";

export default function Login() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.logoBox}>
          <Image src={Logo} alt="로고" width={92} height={92} />
          <p className={styles.loginTitle}>쇼터디</p>
          <p className={styles.loginSubtitle}>단 하루를 위한 스터디 매칭 서비스</p>
        </div>
        <div className={styles.joinBox}>
          <Image
            src={kakaoLogin}
            alt="카카오 로그인 버튼"
            width={400}
            height={60}
            className={styles.kakaoBtn}
            onClick={loginHandler}
          />
          <p className={styles.preview}>둘러보기</p>
        </div>
      </div>
    </div>
  );
}
