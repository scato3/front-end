const uploadUrl = process.env.NEXT_PUBLIC_UPLOAD_API as string;
const preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET as string;
const cloudName = process.env.NEXT_PUBLIC_UPLOAD_CLOUD_NAME as string;
export default async function uploadImage(data: File | string): Promise<string | null> {
  try {
    const image = new FormData();
    image.append("file", data);
    image.append("upload_preset", preset);
    image.append("cloud_name", cloudName);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: image,
    });

    if (response.ok) {
      const result = await response.json();
      return result?.url.toString() as string;
    } else {
      console.error("Error uploading image:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
}
