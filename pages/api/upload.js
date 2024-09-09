import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { connect } from "../../utils/config/dbConfig";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await connect();

  const form = new multiparty.Form();

  // Parse form and get fields and files
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  if (!files.file || !files.file.length) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Single file upload
  const file = files.file[0]; // Only process the first file in the array
  const ext = path.extname(file.originalFilename);
  const newFilename = Date.now() + ext;
  const tempFilePath = path.join('./', newFilename);

  // Move file to temporary path
  fs.renameSync(file.path, tempFilePath);

  try {
    // Upload to Cloudinary
    const response = await cloudinary.uploader.upload(tempFilePath, {
      folder: process.env.CLOUDINARY_FOLDER, // Optional: specify a folder in Cloudinary
    });

    // Return the Cloudinary URL
    const uploadedLink = response.secure_url;

    // Log the uploaded link (for backend debugging)
    console.log('Uploaded file URL:', uploadedLink);

    // Return the link as JSON response
    return res.json({ link: uploadedLink });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ error: 'Failed to upload file to Cloudinary' });
  } finally {
    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);
  }
}

export const config = {
  api: { bodyParser: false },
};
