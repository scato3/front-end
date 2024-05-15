import { useState, useEffect } from "react";
import styles from "../fastmatching.module.css";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import Check_Box from "../../../../public/icons/Icon_checkbox.svg";
import Image from "next/image";
import Button from "@/app/_component/button/Button";
import useFastStore from "../store/FastStore";
import useAuth from "@/hooks/useAuth";
import FastSearch from "@/app/api/fastSearch";
import { useQuery, useMutation } from "@tanstack/react-query";

interface Tendency {
  name: string;
  value: string;
}

const tendencies: Tendency[] = [
  { name: "활발한 대화와 동기부여 원해요", value: "active" },
  { name: "학습 피드백을 주고받고 싶어요", value: "feedback" },
  { name: "조용히 집중하고 싶어요", value: "focus" },
];

export default function SecondPage() {
  const recruits = [
    { name: "2인", value: 0 },
    { name: "3인-5인", value: 1 },
    { name: "6인-10인", value: 2 },
    { name: "11인 이상", value: 3 },
  ];

  const [progress, setProgress] = useState<number>(50);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedRecruits, setSelectedRecruits] = useState<string[]>([]);
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const { fastData, tendency, recruitArr, selectedDate, selectedDuration, selectedField } = useFastStore();
  const { setTendency, setRecruitArr, setFastData } = useFastStore();
  const { accessToken } = useAuth();
  const router = useRouter();

  // 뒤로가기 했을 때 selectedRecruit에도 값이 남아있도록 하기
  useEffect(() => {
    if (selectedCondition.length === 0 && tendency.length > 0) {
      const newSelectedCondition = tendency
        .map((item) => {
          const tendencyItem = tendencies.find((t) => t.value === item);
          return tendencyItem ? tendencyItem.name : null;
        })
        .filter((value) => value !== null) as string[];

      setSelectedCondition(newSelectedCondition);
    }
  }, []);

  // 뒤로가기 했을 때 selectedRecruits 값이 남아있도록 하기
  useEffect(() => {
    if (selectedRecruits.length === 0 && recruitArr.length > 0) {
      const newSelectedRecruit = recruitArr
        .map((item) => {
          const recruitItem = recruits.find((t) => t.value === item);
          return recruitItem ? recruitItem.name : null;
        })
        .filter((value) => value !== null) as string[];

      setSelectedRecruits(newSelectedRecruit);
    }
  }, []);

  const toggleCondition = (name: string, value: string) => {
    setSelectedCondition((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });

    setTendency((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const toggleRecruit = (name: string, value: number) => {
    setSelectedRecruits((prev) => {
      if (prev.includes(name)) {
        return prev.filter((item) => item !== name);
      } else {
        return [...prev, name];
      }
    });

    setRecruitArr((prev) => {
      if (selectedRecruits.includes(name)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    if (tendency.length > 0 && recruitArr.length > 0 && selectedDate && selectedDuration && selectedField)
      setButtonProperty("confirm");
    else {
      setButtonProperty("disabled");
    }
  }, [tendency, recruitArr, selectedDate, selectedDuration, selectedField]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const mutation = useMutation({
    mutationFn: () => {
      let duration = selectedDuration !== "미정" ? selectedDuration : "";

      const res = FastSearch(
        {
          save: false,
          category: selectedField,
          startDate: selectedDate,
          duration,
          mem_scope: recruitArr,
          tendency,
        },
        accessToken,
      );
      return res;
    },
    onSuccess: (data) => {
      setFastData(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleNext = () => {
    mutation.mutate();
    console.log(fastData);
  };

  return (
    <div className={styles.SecondContainer}>
      <Navigation
        dark={false}
        isBack={true}
        onClick={() => {
          router.push("./fastMatching?step=1");
        }}
      >
        빠른 매칭
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.ContentContainer}>
        <p className={styles.SecondHeader}>학습 성향과 선호 인원을 선택해 주세요</p>
        <p className={styles.ConditionHeader}>분위기</p>
        <div className={styles.ConditionContainer}>
          {tendencies.map((condition, index) => (
            <div
              key={index}
              className={`${styles.Condition} ${selectedCondition.includes(condition.name) ? styles.Selected : ""}`}
              onClick={() => toggleCondition(condition.name, condition.value)}
            >
              {condition.name}
            </div>
          ))}
        </div>
        <p className={styles.RecruitHeader}>모집인원</p>
        <div className={styles.RecruitContainer}>
          {recruits.map((count, index) => (
            <div
              key={index}
              className={`${styles.Recruit} ${selectedRecruits.includes(count.name) ? styles.Selected : ""}`}
              onClick={() => toggleRecruit(count.name, count.value)}
            >
              {count.name}
            </div>
          ))}
        </div>
        <div className={styles.RememberContainer}>
          <p>다음에도 이 조건을 기억할게요</p>
          <Image src={Check_Box} width={24} height={24} alt="체크 박스" className={styles.CheckImg} />
        </div>
        <div className={styles.ButtonContainer}>
          <Button size="large_main" onClick={handleNext} property={buttonProperty}>
            매칭하기
          </Button>
        </div>
      </div>
    </div>
  );
}
