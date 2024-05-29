import styles from "../createStudy.module.css";
import Navigation from "@/app/_component/navigation/page";
import Button from "@/app/_component/button/Button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Icon_X from "../../../../public/icons/Icon_X.svg";
import Icon_four from "../../../../public/icons/Icon_fourtag.svg";
import Icon_caution from "../../../../public/icons/Icon_tagCaution.svg";
import useCreateStore from "../store/CreateStore";
import useAuth from "@/hooks/useAuth";
import setStudy from "@/app/api/createStudy";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import CreateModal from "./CreateModal";

export default function CreateLast() {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(75);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [creationInProgress, setCreationInProgress] = useState<boolean>(false);
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "confirm">("disabled");
  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const {
    selectedDate,
    selectedField,
    selectedDuration,
    recruit,
    tendency,
    matchingType,
    setSelectedDate,
    setSelectedDuration,
  } = useCreateStore();
  const { accessToken } = useAuth();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\s/g, "");
    setTagInput(newValue);
  };

  const handleTagFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagInput.trim() !== "") {
      const trimmedTag = tagInput.trim().toLowerCase();
      if (tags.length < 4) {
        if (!tags.includes(trimmedTag)) {
          setTags([...tags, trimmedTag]);
          setTagInput("");
        } else {
          alert("이미 등록된 태그입니다.");
        }
      } else {
        alert("태그는 최대 4개까지만 입력할 수 있습니다.");
      }
    }
  };

  useEffect(() => {
    if (description && title && tags.length > 0) {
      setButtonProperty("confirm");
    } else {
      setButtonProperty("disabled");
    }
  }, [description, title, tags]);

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = async () => {
    if (creationInProgress) {
      return;
    }

    setCreationInProgress(true);
    const postData: any = {
      category: selectedField,
      title,
      description,
      tags,
      start_date: selectedDate,
      max_participants_num: recruit,
      matching_type: matchingType,
      tendency: tendency,
    };

    if (selectedDuration !== "미정") {
      postData.duration = selectedDuration;
    } else {
      postData.duration = "";
    }

    try {
      const result = await setStudy(postData, accessToken);
      handleOpenModal();
    } catch (error) {
      console.error(error);
    } finally {
      setCreationInProgress(false);
    }
  };

  const goBack = () => {
    setSelectedDate(null);
    setSelectedDuration(null);
    router.push("./home");
  };

  const placeholderText = "쇼터디에 대한 설명을 작성해주세요.\n(예시_매주 3회이상 필수참여하실 수 있는 분들 함께해요!)";

  return (
    <div className={styles.Container}>
      <Navigation
        dark={false}
        isBack={true}
        onClick={() => {
          goBack();
        }}
      >
        쇼터디 생성
      </Navigation>
      <div className={styles.seperator}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.LastContainer}>
          <p className={styles.LastHeader}>거의 다 왔어요!</p>
          <p className={styles.LastHeader}>쇼터디 이름과 소개글, 태그를 작성해 주세요!</p>
        </div>
        <div className={styles.Header}>쇼터디명</div>
        <input
          placeholder="스터디 이름을 알려주세요"
          className={styles.title}
          maxLength={20}
          onChange={handleTitleChange}
        />
        <p className={styles.titleInfo}>20글자까지 할 수 있어요</p>
        <p className={styles.Header}>소개</p>
        <textarea
          placeholder={placeholderText}
          className={styles.description}
          maxLength={100}
          onChange={handleDescriptionChange}
        />
        <p className={styles.Header}>태그</p>
        <form onSubmit={handleTagFormSubmit}>
          <input
            placeholder="태그 작성으로, 스터디를 더 쉽게 알릴 수 있어요!"
            className={styles.title}
            value={tagInput}
            onChange={handleTagInputChange}
            maxLength={6}
          />
        </form>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <div key={index} className={styles.tag}>
              <p className={styles.tagText}>#{tag}</p>
              <Image
                src={Icon_X}
                width={10}
                height={10}
                alt="X버튼"
                onClick={() => removeTag(index)}
                className={styles.xIcon}
              />
            </div>
          ))}
          {tags.length === 0 && (
            <div className={styles.tagInfoContainer}>
              <p className={styles.tagInfo}>한번에 4개까지 등록할 수 있어요</p>
              <p className={styles.tagInfo}>최대 6글자로 태그를 작성해 주세요</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.ButtonContainer}>
        <Button size="large_main" property={buttonProperty} onClick={handleNext}>
          쇼터디 시작하기
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <CreateModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
