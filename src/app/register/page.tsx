"use client";

import FirstPage from "./_component/FirstPage";
import SecondPage from "./_component/SecondPage";
import LastPage from "./_component/LastPage";
import useFunnel from "@/hooks/useFunnel";

const steps: string[] = [
  "첫화면",
  "회원가입",
  "가입완료"
];

export default function RegisterPage() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  return (
    <Funnel>
      <Step name="첫화면">
        <FirstPage onRegister={() => setStep("회원가입")} />
      </Step>
      <Step name="회원가입">
        <SecondPage onRegister={() => setStep("가입완료")} />
      </Step>
      <Step name="가입완료">
        <LastPage />
      </Step>
    </Funnel>
  );
}
