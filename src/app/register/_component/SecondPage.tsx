"use client";

import React, { useState, useEffect } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function SecondPage({ onRegister }: { onRegister: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    return username.trim() !== "" && email.trim() !== "" && password.trim() !== "";
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">사용자 이름:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">이메일:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={!isFormValid}>
          가입하기
        </button>
      </form>
    </div>
  );
}
