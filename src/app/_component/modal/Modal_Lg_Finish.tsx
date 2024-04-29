import styles from './modal.module.css';
import Button from '../button/Button';

export default function Modal_Lg_Finish() {

    return(
        <div className={styles.container}>
            <div className={styles.modalLargeBox}>
                <p className={styles.contentTop}></p>
                <p className={styles.contentBottom}></p>
                <Button 
                    size='small'
                    text='' 
                    property='default' 
                    onClick={()=>{}}>
                </Button>
            </div>
        </div>
    );
}