"use client";

import useFunnel from "@/hooks/useFunnel";
import FirstPage from "./_component/FirstPage";
import LastPage from "./_component/LastPage";

const steps: string[] = ["회원가입", "가입완료"];

export default function RegisterPage() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  return (
    <Funnel>
      <Step name="회원가입">
        <FirstPage onRegister={() => setStep("가입완료")} />
      </Step>
      <Step name="가입완료">
        <LastPage />
      </Step>
    </Funnel>
  );
}
