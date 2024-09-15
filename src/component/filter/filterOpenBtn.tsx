import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import styles from './filterOpenBtn.module.scss';
import { ArrowDown } from '../../../public/arrow';
import { IconBolt, IconActiveBolt } from '../../../public/icons';
import { useModal } from '@/hooks/useModal';
import ModalContainer from '../common/modalContainer';
import ModalPortal from '../common/modalPortal';
import FilterModal from '../modal/filterModal';
import { useFormContext } from 'react-hook-form';
import { tendencyOption } from '@/data/filterData';
import { durationOption } from '@/data/durationData';
import { filterStatus } from '@/data/filterStatus';
import { formatDate } from '@/utils/dateformat';
import { useSearchParams } from 'next/navigation';

export default function FilterOpenBtn() {
  const { openModal, handleCloseModal, handleOpenModal } = useModal();
  const { getValues, setValue } = useFormContext();
  const searchParams = useSearchParams();

  // 퀵매치 상태 관리
  const [isQuickMatchActive, setQuickMatchActive] = useState<boolean>(false);

  const [sliderRef] = useKeenSlider({
    breakpoints: {
      '(min-width: 300px)': {
        slides: { perView: 3, spacing: 10 },
      },
      '(min-width: 390px)': {
        slides: { perView: 3.5, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'quick') {
      setQuickMatchActive(true);
      setValue('quickMatch', 'quick');
    }
  }, [searchParams, setValue]);

  // 퀵매치 상태에 따라 'quick' 또는 'approval' 전달
  const handleQuickMatchClick = () => {
    const newValue = !isQuickMatchActive ? 'quick' : 'approval';
    setValue('quickMatch', newValue);
    setQuickMatchActive((prev) => !prev);
  };

  // 값에 따라 label을 변환하는 함수
  const getLabelForFilter = (key: string) => {
    const values = getValues();

    switch (key) {
      case 'period':
        const durationLabel = durationOption.find(
          (opt) => opt.key === values.duration
        )?.label;

        if (values.startDate || durationLabel) {
          const formattedStartDate = values.startDate
            ? `${formatDate(values.startDate)} -`
            : '';
          const formattedDuration = durationLabel ? ` ${durationLabel}` : '';

          return `${formattedStartDate}${formattedDuration}`;
        }

        return filterStatus[key as keyof typeof filterStatus].label;

      case 'preference':
        const tendencyLabel = tendencyOption.find(
          (opt) => opt.key === values.tendency
        )?.label;
        return (
          tendencyLabel || filterStatus[key as keyof typeof filterStatus].label
        );

      case 'peopleCount':
        if (values.minParticipants || values.maxParticipants) {
          return `${values.minParticipants} - ${values.maxParticipants}명`;
        }
        return filterStatus[key as keyof typeof filterStatus].label;

      default:
        return filterStatus[key as keyof typeof filterStatus].label;
    }
  };

  return (
    <div className={styles.Container}>
      <div ref={sliderRef} className="keen-slider">
        {Object.keys(filterStatus).map((key) => {
          const typedKey = key as keyof typeof filterStatus;

          const hasValue =
            getLabelForFilter(typedKey) !== filterStatus[typedKey].label;

          return (
            <div key={key} className="keen-slider__slide">
              <div
                className={`${styles.slideBox} ${hasValue ? styles.active : ''}`}
              >
                <div
                  className={styles.slideButton}
                  onClick={() => {
                    if (typedKey === 'quickMatch') {
                      handleQuickMatchClick();
                    } else {
                      handleOpenModal();
                    }
                  }}
                >
                  {typedKey === 'quickMatch' ? (
                    <Image
                      className={styles.boltIcon}
                      src={isQuickMatchActive ? IconActiveBolt : IconBolt}
                      width={16}
                      height={16}
                      alt="IconBolt"
                    />
                  ) : null}
                  <p
                    className={`${styles.content} ${
                      isQuickMatchActive && typedKey === 'quickMatch'
                        ? styles.active
                        : ''
                    }`}
                  >
                    {getLabelForFilter(typedKey)}
                  </p>
                  {typedKey !== 'quickMatch' && (
                    <Image
                      className={styles.arrow}
                      src={ArrowDown}
                      width={16}
                      height={16}
                      alt="ArrowDown"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer>
            <FilterModal handleCloseModal={handleCloseModal} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
