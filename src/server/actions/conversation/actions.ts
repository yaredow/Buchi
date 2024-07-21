"use server";

import cloudinary from "@/lib/cloudinary";
import { UploadApiResponse } from "cloudinary";

export async function uploadChatImage(image: File) {
  try {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const uploadResult = await new Promise<UploadApiResponse | undefined>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: ["doggo-chat"],
              upload_preset: "doggo-chat",
            },
            function (err, result) {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      },
    );

    return uploadResult;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
