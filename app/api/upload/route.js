
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier envoyé' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ 
        folder: 'articles' }, (error, result) => {
        
    if (error) reject(error);
    else resolve(result);
      }).end(buffer);
    });

    return NextResponse.json({ 
        url: result.secure_url,
        public_id: result.public_id,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l’upload' }, { status: 500 });
  }
}
