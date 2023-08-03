import fs from "fs";
import path from "path";

type folderTypes = "business" | "category" | "product" 

// Function to save profile picture and return image URL
export const SaveProfilePicture = (base64Data: string, folder : folderTypes): string | null => {
  if (!base64Data) {
    return null;
  }

  const imageBuffer = Buffer.from(base64Data, "base64");

  const imageFileName = `${Date.now()}.png`; // Use any appropriate file name
  const imagePath = path.join(__dirname, `../static/${folder}`, imageFileName);

  fs.writeFileSync(imagePath, imageBuffer);

  const imageUrl = `/static/${folder}/${imageFileName}`; // URL to serve the image directly

  return imageUrl;
};
