import { useState, useRef, useEffect } from 'react';
import styles from './filterModal.module.scss';
import { CloseModalProps } from '@/types/modalHookType';
import { IconDate, IconDateActive, IconX } from '../../../public/icons';
import Image from 'next/image';
import { ArrowDown } from '../../../public/arrow';
import Button from '../common/button';
import { IconReset } from '../../../public/icons';
import { useFormContext, useWatch } from 'react-hook-form';
import BottomSheet from '../common/bottomSheet';
import { durationOption } from '@/data/durationData';
import { ActiveArrowDown } from '../../../public/arrow';
import Calendar from '../common/calendar';
import dayjs from 'dayjs';
import { IconWarning } from '../../../public/icons';
import { sortOption, tendencyOption } from '@/data/filterData';
import { useGetCard } from '@/apis/card/getCard';
import { defaultCardData } from '@/data/cardInitialData';
import { GetCardType } from '@/types/card/getCardType';

const filterOptions = [
  { key: 0, label: '정렬' },
  { key: 1, label: '상태' },
  { key: 2, label: '분야' },
  { key: 3, label: '기간' },
  { key: 4, label: '인원' },
  { key: 5, label: '성향' },
];

const statusOption = [
  { key: 0, label: '모집중' },
  { key: 1, label: '모집마감' },
];

const fieldOption = [
  { key: 0, label: '수능' },
  { key: 1, label: '대학생' },
  { key: 2, label: '취업' },
  { key: 3, label: '공무원' },
  { key: 4, label: '임용' },
  { key: 5, label: '전문직' },
  { key: 6, label: '어학' },
  { key: 7, label: '자격증' },
  { key: 8, label: '코딩' },
  { key: 9, label: '모각공' },
  { key: 10, label: '기타' },
];

export default function FilterModal({ handleCloseModal }: CloseModalProps) {
  const { handleSubmit, reset, setValue, getValues } =
    useFormContext<GetCardType>();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [isApplyDisabled, setIsApplyDisabled] = useState<boolean>(false);

  const [firstError, setFirstError] = useState<string>('');
  const [secondError, setSecondError] = useState<string>('');

  const currentValues = getValues();
  const { refetch } = useGetCard('all', currentValues, false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleOpenCalendar = () => {
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const getLabel = (key: string) => {
    const option = durationOption.find((opt) => opt.key === key);
    return option ? option.label : '진행 일자 선택';
  };

  const [activeKey, setActiveKey] = useState<number>(0);
  const [underlineStyle, setUnderlineStyle] = useState({
    left: '0px',
    width: '0px',
  });

  const [
    orderType,
    status,
    category,
    duration,
    tendency,
    startDate,
    minParticipants,
    maxParticipants,
  ] = useWatch({
    name: [
      'orderType',
      'status',
      'category',
      'duration',
      'tendency',
      'startDate',
      'minParticipants',
      'maxParticipants',
    ],
  });

  // 인원 수에 대한 에러 처리 함수
  const checkError = (isBlur: boolean) => {
    setFirstError('');
    setSecondError('');
    let hasError = false;

    if (isBlur && (!minParticipants || !maxParticipants)) {
      return true;
    }

    if (!minParticipants && !maxParticipants) {
      return true;
    }

    if (
      minParticipants < 2 ||
      maxParticipants < 2 ||
      minParticipants > 20 ||
      maxParticipants > 20
    ) {
      setFirstError('2~20명 이내만 가능해요');
      hasError = true;
    }

    if (minParticipants >= maxParticipants) {
      setSecondError('최소 인원은 최대 인원보다 적어야 해요');
      hasError = true;
    }

    setIsApplyDisabled(hasError);
    return !hasError;
  };

  // 필터 값 처리하는 함수
  const handleSelectSort = (value: string) => {
    setValue('orderType', value);
  };

  const handleSelectStatus = (value: string) => {
    if (getValues('status') === value) {
      setValue('status', '');
    } else {
      setValue('status', value);
    }
  };

  const handleSelectCategory = (value: string) => {
    if (getValues('category') === value) {
      setValue('category', '');
    } else {
      setValue('category', value);
    }
  };

  const handleSelectTendency = (value: string) => {
    let updatedTendency = (tendency || '').split(',').filter(Boolean);

    if (updatedTendency.includes(value)) {
      updatedTendency = updatedTendency.filter(
        (tendency: string) => tendency !== value
      );
    } else {
      updatedTendency.push(value);
    }

    setValue('tendency', updatedTendency.join(','));
  };

  // 필터 삭제
  const handleRemoveFilter = (filterType: string, valueToRemove?: string) => {
    if (filterType === 'tendency' && valueToRemove) {
      // tendency는 개별 항목 제거
      const currentTendency = getValues('tendency'); // 현재 tendency 값 가져오기
      const updatedTendency = (currentTendency ?? '')
        .split(',')
        .filter((tendKey: string) => tendKey !== valueToRemove) // 제거할 항목 제외
        .join(',');

      setValue('tendency', updatedTendency || ''); // 남은 항목이 없으면 null로 설정
    } else if (
      filterType === 'minParticipants' ||
      filterType === 'maxParticipants'
    ) {
      setFirstError('');
      setSecondError('');
      setValue(filterType, '');
    } else {
      setValue(filterType, '');
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const sortSectionRef = useRef<HTMLDivElement>(null);
  const statusSectionRef = useRef<HTMLDivElement>(null);
  const fieldSectionRef = useRef<HTMLDivElement>(null);
  const periodSectionRef = useRef<HTMLDivElement>(null);
  const peopleSectionRef = useRef<HTMLDivElement>(null);
  const tendencySectionRef = useRef<HTMLDivElement>(null);

  const sectionRefs = [
    sortSectionRef,
    statusSectionRef,
    fieldSectionRef,
    periodSectionRef,
    peopleSectionRef,
    tendencySectionRef,
  ];

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector(
      `.${styles.active}`
    );

    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
      setUnderlineStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeKey]);

  const handleClick = (key: number) => {
    setActiveKey(key);
    sectionRefs[key].current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleBlur = () => {
    checkError(true);
  };

  const onSubmit = () => {
    refetch();

    handleCloseModal();
  };

  // 초기화 함수에서 에러 메시지 초기화
  const handleReset = () => {
    reset({
      ...defaultCardData,
      minParticipants: '',
      maxParticipants: '',
    });

    setFirstError('');
    setSecondError('');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.Container}>
      <div className={styles.navigation}>상세 필터</div>
      {/* 필터 */}
      <div className={styles.section}>
        <section className={styles.filterContainer} ref={containerRef}>
          {filterOptions.map((option) => (
            <p
              key={option.label}
              onClick={() => handleClick(option.key)}
              className={`${activeKey === option.key ? styles.active : ''} filter-option`}
            >
              {option.label}
            </p>
          ))}
          <span
            className={styles.underline}
            style={{
              transform: `translateX(${underlineStyle.left})`,
              width: underlineStyle.width,
            }}
          />
        </section>
      </div>
      {/* 정렬 */}
      <div className={styles.section} ref={sortSectionRef}>
        <h2>정렬</h2>
        <div className={styles.optionContainer}>
          {sortOption.map((option) => (
            <div
              key={option.label}
              className={`${orderType === option.key ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectSort(option.key);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 상태 */}
      <div className={styles.section} ref={statusSectionRef}>
        <h2>상태</h2>
        <div className={styles.optionContainer}>
          {statusOption.map((option) => (
            <div
              key={option.label}
              className={`${status === option.label ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectStatus(option.label);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 분야 */}
      <div className={styles.section} ref={fieldSectionRef}>
        <div className={styles.optionHeader}>
          <h2>분야</h2>
        </div>
        <div className={styles.optionContainer}>
          {fieldOption.map((option) => (
            <div
              key={option.label}
              className={`${category?.includes(option.label) ? styles.selected : ''} ${styles.optionItem}`}
              onClick={() => {
                handleSelectCategory(option.label);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 기간 */}
      <div className={styles.section} ref={periodSectionRef}>
        <h2>기간</h2>
        <div className={styles.dateContainer} onClick={handleOpenCalendar}>
          <p>시작 일자</p>
          <div
            className={`${styles.dateSelect} ${startDate ? styles.activeStartSelect : ''}`}
          >
            {startDate ? startDate : '시작 일자 선택'}
            <Image
              src={startDate ? IconDateActive : IconDate}
              width={18}
              height={18}
              alt="달력"
              className={styles.dateImage}
            />
          </div>
        </div>
        <div className={styles.dateContainer}>
          <p>진행 기간</p>
          <div
            className={`${styles.dateSelect} ${duration ? styles.activeDateSelect : ''}`}
            onClick={handleOpenBottomSheet}
          >
            {duration ? getLabel(duration) : '진행 일자 선택'}
            <Image
              src={duration ? ActiveArrowDown : ArrowDown}
              width={18}
              height={18}
              alt="달력"
              className={styles.dateImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 선호 인원 */}
      <div className={styles.section} ref={peopleSectionRef}>
        <div className={styles.optionHeader}>
          <div className={styles.titleWrapper}>
            <h2>선호 인원</h2>
            <span>*본인포함</span>
          </div>

          {/* 경고 메시지 표시 */}
          <div className={styles.errorContainer}>
            {firstError && (
              <div className={styles.warningContainer}>
                <Image src={IconWarning} width={18} height={18} alt="경고" />
                {firstError}
              </div>
            )}
            {secondError && (
              <div className={styles.warningContainer}>
                <Image src={IconWarning} width={18} height={18} alt="경고" />
                {secondError}
              </div>
            )}
          </div>
        </div>
        <div className={styles.participantOption}>
          <div className={styles.participantContainer}>
            <input
              type="number"
              className={`${styles.participant} ${minParticipants ? styles.active : ''}`}
              placeholder="최소 인원수"
              value={minParticipants || ''}
              onChange={(e) =>
                setValue(
                  'minParticipants',
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              onBlur={handleBlur}
            />
            <span>명</span>
            <p>~</p>
          </div>
          <div className={styles.participantContainer}>
            <input
              type="number"
              className={`${styles.participant} ${maxParticipants ? styles.active : ''}`}
              placeholder="최대 인원수"
              value={maxParticipants || ''}
              onChange={(e) =>
                setValue(
                  'maxParticipants',
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
              onBlur={handleBlur}
            />
            <span>명</span>
          </div>
        </div>
      </div>
      <div className={styles.verticalLine}></div>
      {/* 성향 */}
      <div className={styles.section} ref={tendencySectionRef}>
        <div className={styles.optionHeader}>
          <h2>성향</h2> <span>*중복 선택 가능</span>
        </div>
        <div className={styles.optionContainer}>
          {tendencyOption.map((option) => (
            <div
              key={option.label}
              className={`${tendency?.includes(option.key) ? styles.selected : ''} ${styles.tendencyItem}`}
              onClick={() => {
                handleSelectTendency(option.key);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      </div>{' '}
      {/* 필터 조건  */}
      <div className={styles.checkContainer}>
        {orderType && (
          <div className={styles.filterTag}>
            {sortOption.find((option) => option.key === orderType)?.label}
          </div>
        )}
        {category && (
          <div className={styles.filterTag}>
            {category}
            <Image
              src={IconX}
              width={20}
              height={20}
              alt="X버튼"
              className={styles.filterImage}
              onClick={() => {
                handleRemoveFilter('category');
              }}
            />
          </div>
        )}
        {(startDate || duration) && (
          <div className={styles.filterTag}>
            {startDate ? dayjs(startDate).format('MM.DD') : ''} -{' '}
            {durationOption.find((option) => option.key === duration)?.label}
            <Image
              src={IconX}
              width={20}
              height={20}
              alt="X버튼"
              className={styles.filterImage}
              onClick={() => {
                handleRemoveFilter('startDate');
                handleRemoveFilter('duration');
              }}
            />
          </div>
        )}
        {(minParticipants || maxParticipants) && (
          <div className={styles.filterTag}>
            <div>
              {minParticipants ? minParticipants : ''} -{' '}
              {maxParticipants ? maxParticipants : ''} 명
              <Image
                src={IconX}
                width={20}
                height={20}
                alt="X버튼"
                className={styles.filterImage}
                onClick={() => {
                  handleRemoveFilter('minParticipants');
                  handleRemoveFilter('maxParticipants');
                }}
              />
            </div>
          </div>
        )}
        {tendency?.split(',').map((tendKey: string) => {
          const label = tendencyOption.find(
            (option) => option.key === tendKey
          )?.label;

          return (
            label && (
              <div key={tendKey} className={styles.filterTag}>
                {label}
                <Image
                  src={IconX}
                  width={20}
                  height={20}
                  alt="X버튼"
                  className={styles.filterImage}
                  onClick={() => {
                    handleRemoveFilter('tendency', tendKey);
                  }}
                />
              </div>
            )
          );
        })}
      </div>
      <div className={styles.verticalLine}></div>
      {/* 적용하기 */}
      <div className={styles.applyContainer}>
        <div
          className={styles.resetContainer}
          onClick={() => {
            handleReset();
          }}
        >
          <Image src={IconReset} width={21} height={21} alt="초기화" />
          <p>초기화</p>
        </div>
        <Button onClick={() => {}} disabled={isApplyDisabled} size="medium">
          적용하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
      <Calendar isOpen={isCalendarOpen} onClose={handleCloseCalendar} />
    </form>
  );
}
