export const processImageFile = async (
  file: File,
  setProfileImage: (image: string) => void,
  convertToWebP: (file: File) => Promise<File>,
  showAlert: (message: string) => void
) => {
  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/webp',
  ];
  if (!allowedTypes.includes(file.type)) {
    showAlert('지원하지 않는 이미지 형식입니다.');
    return;
  }

  // 파일을 base64로 변환하여 미리보기
  const reader = new FileReader();
  reader.onloadend = () => {
    setProfileImage(reader.result as string);
  };
  reader.readAsDataURL(file);

  // WebP로 변환
  try {
    const webpFile = await convertToWebP(file);
    return webpFile;
  } catch (error) {
    showAlert('이미지 변환에 실패했습니다.');
  }
};
