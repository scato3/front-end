import styles from './input_chat.module.css'
import Image from 'next/image';
import plus_icon from '../../../../public/icons/Plus_icon.svg';

export default function Input_Chat () {
    return(
        <div className={styles.container}>
            <Image 
                className={styles.icon}
                src={plus_icon}
                alt='plus_icon'
                onClick={()=> {
                    return;
                }}
            />
            <input 
                className={styles.input}
                placeholder='어떤 스터디를 찾으시나요?'
            />
        </div>
    );
}