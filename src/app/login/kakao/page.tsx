"use client";

import { useEffect } from "react";
import { GET } from "@/_lib/fetcher";

export default function Kakao() {
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
}
