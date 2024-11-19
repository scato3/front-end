import { useEffect, useState } from 'react';
import Navigation from '../common/navigation';
import styles from './step.module.scss';
import TopText from './topText';
import Button from '../common/button';
import { useFormContext, useWatch } from 'react-hook-form';
import { IconX, IconWarning } from '../../../public/icons';
import Image from 'next/image';
import { usePostCreateStudy } from '@/apis/study/create';
import { CreateStudyDataType } from '@/types/createStudy/create';
import { useAlert } from '@/context/alertProvider';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '../common/modalContainer';
import ModalPortal from '../common/modalPortal';
import CheckModal from '../modal/checkModal';
import { useRouter } from 'next/navigation';

interface IStep4 {
  onBefore: () => void;
}

export default function LastPage({ onBefore }: IStep4) {
  const { mutate } = usePostCreateStudy();

  const [progress, setProgress] = useState<number>(75);
  const { control, setValue, getValues } =
    useFormContext<CreateStudyDataType>();
  const [error, setError] = useState<string>('');

  // title, description, tags 값 가져오기
  const [title, description, tags] = useWatch({
    control,
    name: ['title', 'description', 'tags'],
  });

  const [inputValue, setInputValue] = useState<string>('');
  const { showAlert } = useAlert();
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // 2초 후 에러 메시지 지우는 함수
  const clearErrorMessage = () => {
    setTimeout(() => {
      setError('');
    }, 2000);
  };

  // title 값 변경 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('title', e.target.value);
  };

  // description 값 변경 핸들러
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue('description', e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      return;
    }

    if (e.key === 'Enter' && !e.nativeEvent.isComposing && inputValue.trim()) {
      if (tags.includes(inputValue.trim())) {
        setError('이미 등록한 태그에요');
        clearErrorMessage();
        setInputValue('');
      } else if (tags.length >= 4) {
        setError('태그는 4개까지만 가능합니다');
        clearErrorMessage();
      } else if (inputValue.length <= 6) {
        setValue('tags', [...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_: string, i: number) => i !== index);
    setValue('tags', newTags);
  };

  const handleCreate = () => {
    const formData = getValues();
    const requestData = {
      ...formData,
      start_date: formData.startDate,
    };

    delete requestData.startDate;

    mutate(requestData, {
      onSuccess: () => {
        handleOpenModal();
      },
      onError: (error) => {
        showAlert(error.message);
      },
    });
  };

  const handleModalClose = () => {
    handleCloseModal();
    router.push('/');
  };

  return (
    <div className={styles.Container}>
      <Navigation title="쇼터디 생성" onClick={onBefore} />
      <div className={styles.seperator}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
        <TopText step={4} />
        <div className={styles.ContentsContainer}>
          <p className={styles.contents}>쇼터디명</p>
          <div className={styles.optionContainer}>
            <input
              className={styles.title}
              placeholder="20글자까지 작성할 수 있어요!"
              maxLength={20}
              value={title || ''}
              onChange={handleTitleChange}
            />
          </div>
          <p className={styles.contents}>소개</p>
          <div className={styles.optionContainer}>
            <textarea
              className={styles.description}
              placeholder={`쇼터디에 대한 설명을 작성해주세요.
(예시_매주 3회 이상 필수참여하실 수 있는 분들 함께해요!)`}
              value={description || ''}
              onChange={handleDescriptionChange}
              maxLength={100}
            />
          </div>
          <div className={styles.tagsHeader}>
            <p className={styles.contents}>태그</p>
            {!error && (
              <span>
                *태그를 작성하면 사용자들이 우리 스터디를 더 쉽게 찾을 수
                있어요!
              </span>
            )}
            {error && (
              <div className={styles.warningContainer}>
                <Image src={IconWarning} width={18} height={18} alt="경고" />
                {error}
              </div>
            )}
          </div>
          <div className={styles.optionContainer}>
            <input
              className={styles.title}
              placeholder="최대 6글자, 4개의 태그를 입력할 수 있어요."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              maxLength={6}
            />
          </div>
          <div className={styles.tagList}>
            {tags.map((tag: string, index: number) => (
              <div className={styles.tagItem} key={index}>
                <span>{`#${tag}`}</span>
                <Image
                  src={IconX}
                  className={styles.removeTag}
                  alt="삭제 아이콘"
                  onClick={() => removeTag(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          disabled={!title || !description || tags.length === 0}
          onClick={handleCreate}
        >
          다음
        </Button>
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleModalClose}>
            <CheckModal message="쇼터디가 생성되었어요!" />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
