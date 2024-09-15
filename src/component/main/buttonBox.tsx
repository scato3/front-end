'use client';

import styles from './buttonBox.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  탐색하기,
  수능,
  대학생,
  취업,
  전문직,
  어학,
  자격증,
  코딩,
  공무원,
  임용,
  모각공,
  기타,
} from '../../../public/category';
import { LeftActive, RightActive } from '../../../public/arrow';

const icons = [
  { icon: 탐색하기, alt: '탐색하기' },
  { icon: 수능, alt: '수능' },
  { icon: 대학생, alt: '대학생' },
  { icon: 취업, alt: '취업' },
  { icon: 전문직, alt: '전문직' },
  { icon: 어학, alt: '어학' },
  { icon: 자격증, alt: '자격증' },
  { icon: 코딩, alt: '코딩' },
  { icon: 공무원, alt: '공무원' },
  { icon: 임용, alt: '임용' },
  { icon: 모각공, alt: '모각공' },
  { icon: 기타, alt: '기타' },
];

const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.leftArrow} onClick={onClick}>
    <Image src={RightActive} width={30} height={30} alt="next" />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className={styles.rightArrow} onClick={onClick}>
    <Image src={LeftActive} width={30} height={30} alt="before" />
  </div>
);

export default function ButtonBox() {
  const router = useRouter();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <div className={styles.swiperContainer}>
        <Slider {...settings}>
          <div>
            <div className={styles.iconRow}>
              {icons.slice(0, 8).map((icon) => (
                <div key={icon.alt} className={styles.iconContainer}>
                  <div
                    className={styles.iconItem}
                    onClick={() => {
                      {
                        icon.alt === '탐색하기'
                          ? router.push('/studyList')
                          : router.push(`./studyList?tab=${icon.alt}`);
                      }
                    }}
                  >
                    <Image
                      src={icon.icon}
                      alt={icon.alt}
                      className={styles.iconImage}
                    />
                  </div>
                  <p className={styles.category}>{icon.alt}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.iconRowSecond}>
              {icons.slice(8, 12).map((icon) => (
                <div key={icon.alt} className={styles.iconContainer}>
                  <div
                    className={styles.iconItem}
                    onClick={() => {
                      router.push(`./studyList?tab=${icon.alt}`);
                    }}
                  >
                    <Image
                      src={icon.icon}
                      alt={icon.alt}
                      className={styles.iconImage}
                    />
                  </div>
                  <p className={styles.category}>{icon.alt}</p>
                </div>
              ))}
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}
