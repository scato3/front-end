"use client";

import React, { useState } from "react";
import useGlobalStore from "@/hooks/useGlobalStore";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { setIsLogin, isLogin } = useGlobalStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // fetch 부분 생략
      if (username === "admin" && password === "1234") {
        alert("로그인 성공!");
        setIsLogin(true);
        console.log(isLogin);
      } else {
        setError("사용자 이름 또는 비밀번호가 잘못되었습니다.");
        setIsLogin(false);
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
