export const uploadFile = async (onUpload: (file: File) => void) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';

  input.onchange = async () => {
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (file.type.startsWith('image/')) {
      const webpFile = await convertToWebP(file);
      onUpload(webpFile);
    } else {
      onUpload(file);
    }

    input.value = '';
  };

  input.click();
};

const convertToWebP = async (file: File): Promise<File> => {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  ctx.drawImage(imageBitmap, 0, 0);

  return new Promise<File>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) throw new Error('Failed to convert image to WebP');

        const webpFile = new File(
          [blob],
          file.name.replace(/\.[^/.]+$/, '.webp'),
          {
            type: 'image/webp',
          }
        );
        resolve(webpFile);
      },
      'image/webp',
      0.8
    );
  });
};
