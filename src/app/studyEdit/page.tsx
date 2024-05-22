"use client";

import styles from "./studyEdit.module.css";
import Navigation from "@/app/_component/navigation/page";
import Button from "@/app/_component/button/Button";
import { useState, useEffect } from "react";
import Image from "next/image";
import Icon_X from "../../../public/icons/Icon_X.svg";
import Icon_four from "../../../../public/icons/Icon_fourtag.svg";
import Icon_caution from "../../../../public/icons/Icon_tagCaution.svg";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import CreateModal from "../createStudy/_component/CreateModal";
import EditStudy from "../api/editStudy";
import GetEditStudy from "../api/getEditStudy";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import AlertModal from "../_component/modal/alertModal";

interface IStudyData {
  title: string;
  description: string;
  tags: string[];
}

export default function StudyEdit() {
  const { accessToken } = useAuth();
  const params = useSearchParams();
  const studyIdString = params.get("studyId");
  const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
  const router = useRouter();
  const [tagInput, setTagInput] = useState<string>("");
  const [buttonProperty, setButtonProperty] = useState<"disabled" | "default">("default");
  const { openModal, handleOpenModal, handleCloseModal } = useModal();
  const [isEdited, SetIsEdited] = useState<boolean>(false);
  const [patchData, setPatchData] = useState<IStudyData>({
    title: "",
    description: "",
    tags: [],
  });
  const { title, description, tags } = patchData;
  const { data, isLoading, error } = useQuery({
    queryKey: ["EDIT_STUDY_INFO", studyId],
    queryFn: async () => GetEditStudy(studyId, accessToken),
  });

  useEffect(() => {
    if (data) {
      setPatchData({
        ...patchData,
        title: data.data.title,
        description: data.data.description,
        tags: data.data.tags,
      });
    }
    if (error) console.log(error);
  }, [data, error]);

  useEffect(() => {
    if (isEdited) {
      editStudy();
      SetIsEdited(!isEdited);
    }
  }, [isEdited]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatchData({
      ...patchData,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatchData({
      ...patchData,
      description: e.target.value,
    });
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagInput.trim() !== "") {
      const trimmedTag = tagInput.trim().toLowerCase();
      if (tags.length < 4) {
        if (!tags.includes(trimmedTag)) {
          setPatchData({
            ...patchData,
            tags: [...tags, trimmedTag],
          });
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
      setButtonProperty("default");
    } else {
      setButtonProperty("disabled");
    }
  }, [description, title, tags]);

  const removeTag = (indexToRemove: number) => {
    setPatchData({
      ...patchData,
      tags: tags.filter((_, index) => index !== indexToRemove),
    });
  };

  const editStudy = async () => {
    console.log(patchData);
    try {
      const res = await EditStudy(studyId, accessToken, patchData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditStudy = () => {
    SetIsEdited((prev) => !prev);
    handleOpenModal();
  };

  const handleClose = () => {
    handleCloseModal();
    router.push(`/studyInfo?studyId=${data.id}`);
  };

  return (
    <div className={styles.Container}>
      <Navigation dark={false} isBack={true} onClick={() => router.back()}>
        쇼터디 수정
      </Navigation>
      <div className={styles.seperator}></div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.contentContainer}>
          <div className={styles.LastContainer}>
            <p className={styles.LastHeader}>쇼터디의 이름과 </p>
            <p className={styles.LastHeader}>멤버들에게 보여질 소개글, 태그를 입력해 주세요.</p>
          </div>
          <div className={styles.Header}>쇼터디명</div>
          <input className={styles.title} maxLength={20} onChange={handleTitleChange} defaultValue={title} />
          <p className={styles.titleInfo}>20글자까지 할 수 있어요.</p>
          <p className={styles.Header}>소개</p>
          <textarea
            className={styles.description}
            maxLength={100}
            onChange={handleDescriptionChange}
            defaultValue={description}
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
      )}
      <div className={styles.ButtonContainer}>
        <Button size="large_main" property={buttonProperty} onClick={handleEditStudy}>
          쇼터디 수정하기
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <AlertModal handleCloseModal={handleClose}>
              변경 사항이 저장되었어요!
            </AlertModal>
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
