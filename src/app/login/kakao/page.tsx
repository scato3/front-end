"use client";

import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import getKakaoCode from "@/app/api/kakao";

export default function Kakao() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const { setUserData } = useAuth();

  const { data } = useQuery({
    queryKey: ["KAKAO_CODE", code],
    queryFn: async () => getKakaoCode(code),
  });

  useEffect(() => {
    if (data) {
      setUserData(data.accessToken, true);
    }
  }, [data]);
}
