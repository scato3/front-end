"use client";

import { useEffect } from "react";
import { GET } from "@/_lib/fetcher";

export default function Kakao() {
  const REST_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const Test = async () => {
        try {
          const data = await GET({ endpoint: `oauth/kakao?code=${code}` });
          console.log(data.accessToken);
          console.log(data.refreshToken);
        } catch (error) {
          console.error(error);
        }
      };
      Test();
    }
  }, []);

  return (
    <button type="button" onClick={loginHandler}>
      Kakao
    </button>
  );
}
