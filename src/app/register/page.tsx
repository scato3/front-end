import FirstPage from "./_component/FirstPage";
import SecondPage from "./_component/SecondPage";
import LastPage from "./_component/LastPage";
import { useFunnel } from "@/hooks/useFunnel";

export default function RegisterPage() {
  const [Funnel, setStep] = useFunnel<"첫화면" | "회원가입" | "가입완료">("첫화면");

  return (
    <Funnel>
      <Funnel.Step name="첫화면">
        <FirstPage onRegister={() => setStep("회원가입")} />
      </Funnel.Step>
      <Funnel.Step name="회원가입">
        <SecondPage onRegister={() => setStep("가입완료")} />
      </Funnel.Step>
      <Funnel.Step name="가입완료">
        <LastPage />
      </Funnel.Step>
    </Funnel>
  );
}
