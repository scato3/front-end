import styles from './modal.module.css';
import Button from '../button/Button';

export default function Modal_Lg_Confirm() {

    return(
        <div className={styles.container}>
            <div className={styles.modalLargeBox}>
                <p className={styles.contentTop}>중간 사진 인증 시간입니다.</p>
                <p className={styles.contentBottom}>제한 시간 <span className={styles.contentSpan}>1분</span></p>
                <Button
                    size='small'
                    text='인증하기' 
                    property='default' 
                    onClick={()=>{return;}}>
                </Button>
            </div>
        </div>
    );
}