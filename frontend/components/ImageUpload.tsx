'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Upload, RefreshCw } from 'lucide-react'; // Import Refresh icon
import Image from 'next/image';

export function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false); // New state

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Create a preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      setUploadProgress(0);

      // Create a unique filename
      const fileId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const uniqueFileName = `${fileId}.${fileExtension}`;

      // Upload to Firebase Storage
      const storageRef = ref(storage, `uploads/${uniqueFileName}`);

      // Monitor upload progress
      const uploadTask = uploadBytes(storageRef, file);

      uploadTask.then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Save metadata to Firestore
        await addDoc(collection(db, 'images'), {
          fileName: file.name,
          fileUrl: downloadURL,
          uploadedAt: new Date().toISOString(),
          fileSize: file.size,
          fileType: file.type
        });
        setUploadProgress(100);
        setUploadComplete(true); // Set uploadComplete to true

        setTimeout(() => {
          setUploading(false);
          setUploadProgress(0);
          // Keep previewImage and fileName to display the result
        }, 1000);
      })
      .catch((error) => {
          console.error('Error uploading file:', error);
          setUploading(false);
          setPreviewImage(null);
          setFileName(null);
          setUploadComplete(false); // Reset on error
        }
      );

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setPreviewImage(null);
      setFileName(null);
      setUploadComplete(false); // Reset on error
    }
  };

  const handleRefreshClick = () => {
    // Reset state to allow new upload
    setPreviewImage(null);
    setFileName(null);
    setUploadComplete(false);
  };

  return (
    <div>
      {!uploadComplete ? (
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <button
            className={`flex items-center gap-2 px-6 py-3 bg-themeblue text-white rounded-lg hover:bg-themedarkblue transition ${
              uploading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
            disabled={uploading}
          >
            <Upload className="h-5 w-5" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleRefreshClick}
          className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          <RefreshCw className="h-5 w-5" />
          Upload New Image
        </button>
      )}

      {previewImage && (
        <div className="mt-4">
          <p>Preview: {fileName}</p>
          <Image
            src={previewImage}
            alt="Image Preview"
            width={100}
            height={100}
            className="rounded-md"
            style={{ objectFit: 'cover' }}
          />
        </div>
      )}

      {uploading && (
        <div className="mt-2">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}