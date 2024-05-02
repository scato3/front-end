import styles from './profileModal.module.css';
import useStore from './profileStore';

export default function ProfileModal() {
    const postImg = useStore((state) => state.postImg);
    const setPostImg = useStore((state) => state.setPostImg);
    const previewImg = useStore((state) => state.previewImg);
    const setPreviewImg = useStore((state) => state.setPreviewImg);
    
    function handleFileUpload(e: any) {
        let fileArr = e.target.files;
        setPostImg(Array.from(fileArr));

        const file = fileArr[0];
        setPostImg([file]);

        let fileRead = new FileReader();
            fileRead.onload = () => {
            setPreviewImg(fileRead.result);
        };
        fileRead.readAsDataURL(file);
    }

    return(
        <div className={styles.container}>
            <div className={styles.modalContainer}>
                <label htmlFor="file">
                <p>앨범에서 선택</p>
                <input className={styles.input}
                    type="file" 
                    id="file" 
                    onChange={handleFileUpload}
                    >
                </input>
                </label>
                <div className={styles.horizonLine}></div>
                <p>기본 이미지 선택</p>
                

            </div>
        </div>
    );
}