"use client";

import { useEffect } from "react";
import { GET } from "@/_lib/fetcher";
import useGlobalStore from "@/hooks/useGlobalStore";

export default function Kakao() {
  const { setIsLogin, setToken } = useGlobalStore();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      const Test = async () => {
        try {
          const data = await GET({ endpoint: `oauth/kakao?code=${code}` });
          setIsLogin(true);
          setToken(data.accessToken);
          console.log(data.accessToken);
          console.log(data.profileName);
          console.log(data.email);
        } catch (error) {
          console.error(error);
        }
      };
      Test();
    }
  }, []);
}
