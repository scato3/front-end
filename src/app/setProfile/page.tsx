"use client";

import styles from './profile.module.css';
import arrowBtn from '../../../public/icons/Btn_arrow.svg';
import UploadProfileImage from '../_component/profile/UploadProfileImage';
import Button from '../_component/button/Button';
import caution from '../../../public/Caution.svg';
import Image from 'next/image';

export default function SetProfile() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                    <Image
                        className={styles.arrowBtn}
                        width={48}
                        height={48}
                        src={arrowBtn}
                        alt='arrowBtn'
                        onClick={() => {
                            return;
                        }}
                    />
                    <p className={styles.title}>프로필 등록</p>
                </div>
                    <UploadProfileImage />
                <Image 
                    className={styles.caution}
                    width={344}
                    height={49}
                    src={caution}
                    alt='caution'
                />
                <div className={styles.inputBox}>
                    <input 
                        className={styles.input}
                        type='text'
                        placeholder='사용할 이름을 알려주세요!'
                    />
                </div>
                <div className={styles.buttonBox}>
                    <Button
                        size='large'
                        property='disabled'
                        onClick={()=>{
                            return;
                        }}
                    >등록하기</Button>
                </div>
            </div>
    );
}