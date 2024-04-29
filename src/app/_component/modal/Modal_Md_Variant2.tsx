import styles from './modal.module.css';
import Button from '../button/Button';

export default function Modal_Md_Default() {
    
    return(
        <div className={styles.container}>
            <div className={styles.modalMiddleBox}>
                <p className={styles.contentTop}>피드백을 완료했어요!</p>
                <Button 
                    size='small'
                    text='확인' 
                    property='default' 
                    onClick={()=>{}}>
                </Button>           
            </div>
        </div>
    );
}