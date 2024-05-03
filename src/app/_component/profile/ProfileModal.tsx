import styles from "./profileModal.module.css";
import useStore from "./profileStore";
import defaultImage from "../../../../public/Profile.svg";

interface IProfileModalProps {
  handleCloseModal: () => void;
}

export default function ProfileModal({ handleCloseModal }: IProfileModalProps) {
  const { setPostImg, setPreviewImg } = useStore();

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i;
    if (!allowedExtensions.test(file.name)) {
      alert("jpg, jpeg, png, gif, svg 형식의 이미지 파일만 선택할 수 있습니다.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewImg(fileReader.result as string);
      handleCloseModal();
    };
    fileReader.readAsDataURL(file);

    setPostImg([file]);
  }

  function handleDefaultImageSelect() {
    setPreviewImg(defaultImage);
    setPostImg([]);
    handleCloseModal();
  }

  return (
    <div className={styles.container}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <label htmlFor="file">
          <p className={styles.selectionText}>앨범에서 선택</p>
          <input
            className={styles.input}
            type="file"
            id="file"
            accept=".jpg, .jpeg, .png, .gif, .svg"
            onChange={handleFileUpload}
          ></input>
        </label>
        <div className={styles.horizonLine}></div>
        <p className={styles.selectionText} onClick={handleDefaultImageSelect}>
          기본 이미지 선택
        </p>
      </div>
    </div>
  );
}
