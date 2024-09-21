'use client';

import { useState, useEffect } from 'react';
import styles from './edit.module.scss';
import { useGetStudyEdit, useStudyPatch } from '@/apis/study/edit';
import { useSearchParams } from 'next/navigation';
import { IconX } from '../../../../public/icons';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Button from '@/component/common/button';
import ModalPortal from '@/component/common/modalPortal';
import ModalContainer from '@/component/common/modalContainer';
import { useModal } from '@/hooks/useModal';
import CheckModal from '@/component/modal/checkModal';
import { useAlert } from '@/context/alertProvider';
import { useRouter } from 'next/navigation';

interface FormValues {
  title: string;
  description: string;
  tags: string[];
}

export default function StudyEditClient() {
  const searchParams = useSearchParams();
  const studyId = Number(searchParams.get('studyId'));

  const { data } = useGetStudyEdit(studyId);
  const { mutate } = useStudyPatch();
  const router = useRouter();

  const [tags, setTags] = useState<string[]>([]);
  const { openModal, handleCloseModal: original, handleOpenModal } = useModal();
  const { showAlert } = useAlert();

  const { register, setValue, handleSubmit, getValues, setError, clearErrors } =
    useForm<FormValues>({
      mode: 'onSubmit',
    });

  useEffect(() => {
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      if (data.tags) {
        setTags(data.tags);
      }
    }
  }, [data, setValue]);

  const onSubmit = (formData: FormValues) => {
    formData.tags = tags;
    console.log('Form submitted:', formData);

    mutate(
      {
        study_id: studyId,
        formData,
      },
      {
        onSuccess: () => {
          handleOpenModal();
        },
        onError: (error) => {
          showAlert(error.message);
        },
      }
    );
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputElement = e.target as HTMLInputElement;
      const newTag = inputElement.value.trim();

      if (tags.length >= 4) {
        setError('tags', {
          type: 'manual',
          message: '태그는 4개까지만 가능합니다.',
        });

        setTimeout(() => {
          clearErrors('tags');
        }, 2000);
      } else if (newTag && !tags.includes(newTag)) {
        setTags((prevTags) => [...prevTags, newTag]);
        inputElement.value = '';
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  const isButtonDisabled =
    getValues('description') === '' ||
    getValues('title') === '' ||
    tags.length === 0;

  const handleCloseModal = () => {
    original();
    router.push('/');
  };

  return (
    <>
      <div className={styles.section}>
        <h2>스터디 이름과</h2>
        <h2>멤버들에게 보여질 소개글과 태그를 입력해 주세요</h2>

        {/* 스터디명 입력 */}
        <div className={styles.titleContainer}>
          <h2>쇼터디명</h2>
          <input
            {...register('title', { required: '스터디명을 입력해주세요.' })}
            placeholder="20글자까지 작성할 수 있어요"
            className={styles.input}
            maxLength={20}
          />
        </div>

        {/* 소개 입력 */}
        <div className={styles.descriptionContainer}>
          <h2>소개</h2>
          <textarea
            {...register('description', { required: '소개를 입력해주세요.' })}
            placeholder={`쇼터디에 대한 설명을 작성해주세요.
(예시_매주 3회 이상 필수참여하실 수 있는 분들 함께해요!)`}
            maxLength={100}
            className={styles.textarea}
          />
        </div>

        {/* 태그 입력 */}
        <div className={styles.tagsContainer}>
          <div className={styles.tagHeader}>
            <h2>태그</h2>
            <span>
              *태그를 작성하면 사용자들이 우리 스터디를 더 쉽게 찾을 수 있어요!
            </span>
          </div>

          <input
            className={styles.input}
            placeholder="최대 6글자, 4개의 태그를 입력할 수 있어요."
            maxLength={6}
            onKeyDown={handleTagInput}
            disabled={tags.length >= 4} // 태그가 4개 이상이면 입력 필드 비활성화
          />

          {/* 태그 리스트 */}
          <div className={styles.tagBox}>
            {tags.map((tag) => (
              <div key={tag} className={styles.tag}>
                <p>#{tag}</p>
                <Image
                  src={IconX}
                  width={20}
                  height={20}
                  alt="X버튼"
                  className={styles.filterImage}
                  onClick={() => removeTag(tag)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button onClick={handleSubmit(onSubmit)} disabled={isButtonDisabled}>
          저장
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <CheckModal message="변경사항이 저장되었어요" />
          </ModalContainer>
        </ModalPortal>
      )}
    </>
  );
}
