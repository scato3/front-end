import { useState } from "react";
import styels from "./selectBox.module.css";

interface IDuration {
  duration: string;
  property: string;
}

const durations: IDuration[] = [
  { duration: "하루", property: "1d" },
  { duration: "일주일", property: "1w" },
  { duration: "한달", property: "1m" },
  { duration: "3개월", property: "3m" },
  { duration: "6개월", property: "6m" },
  { duration: "상시모집", property: "always" },
];

export default function DurationBox() {
  const [selectedDuration, setSelectedDuration] = useState<IDuration | null>(null);

  const handleSelectDuration = (duration: IDuration) => {
    if (selectedDuration?.duration === duration.duration) {
      setSelectedDuration(null);
    } else {
      setSelectedDuration(duration);
    }
  };
  return (
    <div className={styels.Container}>
      {durations.map((dur: IDuration, index: number) => (
        <div
          key={index}
          className={`${styels.Filter} ${selectedDuration?.duration === dur.duration ? styels.Selected : styels.Default}`}
          onClick={() => {
            handleSelectDuration(dur);
          }}
        >
          {dur.duration}
        </div>
      ))}
    </div>
  );
}
