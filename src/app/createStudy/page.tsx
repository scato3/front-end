"use client";

import useFunnel from "@/hooks/useFunnel";
import CreateFirst from "./_component/CreateFirst";
import CreateSecond from "./_component/CreateSecond";
import CreateThird from "./_component/CreateThird";
import CreateLast from "./_component/CreateLast";

const steps: string[] = ["분야선택", "기간및모집인원", "목적및방식", "마지막"];

export default function createStudy() {
  const [Funnel, Step, setStep] = useFunnel(steps[0]);

  return (
    <Funnel>
      <Step name="분야선택">
        <CreateFirst onNext={() => setStep("기간및모집인원")} />
      </Step>
      <Step name="기간및모집인원">
        <CreateSecond onNext={() => setStep("목적및방식")} />
      </Step>
      <Step name="목적및방식">
        <CreateThird onNext={() => setStep("마지막")} />
      </Step>
      <Step name="마지막">
        <CreateLast />
      </Step>
    </Funnel>
  );
}
