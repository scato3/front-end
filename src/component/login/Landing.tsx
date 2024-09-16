'use client';

import Image from 'next/image';
import styles from './landing.module.scss';

import { getAppCookie } from '@/utils/cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useExploreStore from '@/store/explore';
import { IconLogo, KakaoLoginLargeImage } from '../../../public/icons';

export default function Landing() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login`;
  const accessToken = getAppCookie(
    process.env.NEXT_PUBLIC_COOKIE_TOKEN_KEY ?? ''
  );
  const router = useRouter();
  const { setExplore } = useExploreStore();

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    if (accessToken) {
      router.push('./');
    }
  }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logoBox}>
        <Image src={IconLogo} alt="로고" width={140} height={140} />
        <div className={styles.titleContainer}>
          <p>쇼터디</p>
          <p>딱 맞는 온라인 스터디메이트 찾기</p>
        </div>
      </div>
      <div className={styles.joinBox}>
        <Image
          src={KakaoLoginLargeImage}
          alt="카카오 로그인 버튼"
          layout="responsive"
          className={styles.kakaoBtn}
          onClick={loginHandler}
        />
        <p
          className={styles.preview}
          onClick={() => {
            setExplore(true);
            router.push('./');
          }}
        >
          둘러보기
        </p>
      </div>
    </div>
  );
}
