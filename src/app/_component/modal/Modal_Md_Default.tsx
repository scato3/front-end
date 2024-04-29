import styles from './modal.module.css';
import Button from '../button/Button';

export default function Modal_Md_Variant2() {
    
    return(
        <div className={styles.container}>
            <div className={styles.modalMiddleBox}>
                <p className={styles.contentTop}>쇼터디를 종료할까요?</p>
                <div className={styles.twoButtonBox}>
                    <Button 
                        size='small'
                        text='인증하기' 
                        property='disabled' 
                        onClick={()=>{}}>
                    </Button>   
                    <Button 
                        size='small'
                        text='종료' 
                        property='default' 
                        onClick={()=>{}}>
                    </Button>            
                </div>     
            </div>
        </div>
    );
}