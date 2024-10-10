export const convertToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const webpFile = new File(
                  [blob],
                  `${file.name.split('.')[0]}.webp`,
                  {
                    type: 'image/webp',
                  }
                );
                resolve(webpFile);
              } else {
                reject(new Error('Blob 생성에 실패했습니다.'));
              }
            },
            'image/webp',
            0.8 // 이미지 품질 (0.0 - 1.0)
          );
        } else {
          reject(new Error('Canvas context 생성에 실패했습니다.'));
        }
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};
