import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: "dgvxxnjfm",
  secure: true,
})

export async function uploadImage(base64Image: string) {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "snapcrack",
    })
    return result.secure_url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

