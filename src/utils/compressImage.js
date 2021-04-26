import imageCompression from "browser-image-compression";

const opts = {
  maxSizeMB: 6,
  maxWidthOrHeight: 1080,
};

export default async function compressImage(image) {
  const newImg = await imageCompression(image, opts);
  newImg.lastModifiedDate = Date.now();
  newImg.fileName = image.name;

  const file = new File([newImg], image.name);
  return file;
}
