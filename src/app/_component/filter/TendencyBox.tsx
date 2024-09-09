import { useState } from "react";
import styels from "./selectBox.module.css";

interface ITendency {
  tendency: string;
  property: string;
}

const durations: ITendency[] = [
  { tendency: "활발한 대화와 동기부여를 원해요", property: "active" },
  { tendency: "학습 피드백을 주고 받고 싶어요", property: "feedback" },
  { tendency: "조용히 집중하고 싶어요", property: "focus" },
];

export default function TendencyBox() {
  const [selectedTendency, setSelectedTendency] = useState<ITendency | null>(null);

  const handleSelectTendency = (tendency: ITendency) => {
    if (selectedTendency?.tendency === tendency.tendency) {
      setSelectedTendency(null);
    } else {
      setSelectedTendency(tendency);
    }
  };
  return (
    <div className={styels.Container}>
      {durations.map((ten: ITendency, index: number) => (
        <div
          key={index}
          className={`${styels.Filter} ${selectedTendency?.tendency === ten.tendency ? styels.Selected : styels.Default}`}
          onClick={() => {
            handleSelectTendency(ten);
          }}
        >
          {ten.tendency}
        </div>
      ))}
    </div>
  );
}
