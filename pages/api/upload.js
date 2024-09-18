import multiparty from 'multiparty';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { connect } from '../../utils/config/dbConfig';

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

  if (!files.files || !files.files.length) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const uploadedLinks = [];

  try {
    // Process each file
    for (const file of files.files) {
      const ext = path.extname(file.originalFilename);
      const newFilename = Date.now() + ext;
      const tempFilePath = path.join('./', newFilename);

      // Move file to temporary path
      fs.renameSync(file.path, tempFilePath);

      // Upload to Cloudinary
      const response = await cloudinary.uploader.upload(tempFilePath, {
        folder: process.env.CLOUDINARY_FOLDER, // Optional: specify a folder in Cloudinary
      });

      // Add the uploaded link to the array
      uploadedLinks.push(response.secure_url);

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);
    }

    // Return the array of links as JSON response
    return res.json({ links: uploadedLinks });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ error: 'Failed to upload files to Cloudinary' });
  }
}

export const config = {
  api: { bodyParser: false },
};
