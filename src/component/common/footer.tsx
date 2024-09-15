'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { IconAdd } from '../../../public/icons';

const icons = [
  {
    default: '/footer/Icon_home.svg',
    checked: '/footer/Icon_home_check.svg',
    alt: '홈 페이지 이미지',
    value: '', // 루트 경로
  },
  {
    default: '/footer/Icon_search.svg',
    checked: '/footer/Icon_search_check.svg',
    alt: '검색 페이지 이미지',
    value: 'search',
  },
  {
    default: '/footer/Icon_bubble.svg',
    checked: '/footer/Icon_bubble_check.svg',
    alt: 'Bubble',
    value: 'bubble',
  },
  {
    default: '/footer/Icon_profile.svg',
    checked: '/footer/Icon_profile_check.svg',
    alt: '프로필 페이지 이미지',
    value: 'profile',
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  // 정확한 경로 체크를 위해 수정
  if (
    pathname === '/sign-in' ||
    pathname === '/fastMatching' ||
    pathname === '/createStudy'
  )
    return null;

  return (
    <div className={styles.Container}>
      <div
        className={styles.addImage}
        onClick={() => {
          router.push('./createStudy');
        }}
      >
        <Image src={IconAdd} alt="추가 이미지" width={31} height={31} />
      </div>
      {icons.map((icon, index) => {
        const isActive =
          pathname === '/' && icon.value === ''
            ? true
            : pathname === `/${icon.value}`;

        return (
          <Link key={index} href={`/${icon.value}`}>
            <div className={styles.ImageContainer}>
              <Image
                src={isActive ? icon.checked : icon.default}
                alt={icon.alt}
                width={
                  icon.value === 'search' || icon.value === 'bubble' ? 32 : 44
                }
                height={44}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
