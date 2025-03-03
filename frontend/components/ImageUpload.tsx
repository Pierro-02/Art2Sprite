'use client';

import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '@/lib/firebase';
import { v4 as uuidv4 } from 'uuid';
import { Upload } from 'lucide-react';

export function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Create a unique filename
      const fileId = uuidv4();
      const fileExtension = file.name.split('.').pop();
      const fileName = `${fileId}.${fileExtension}`;
      
      // Upload to Firebase Storage
      const storageRef = ref(storage, `uploads/${fileName}`);
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      
      // Save metadata to Firestore
      await addDoc(collection(db, 'images'), {
        fileName: file.name,
        fileUrl: downloadURL,
        uploadedAt: new Date().toISOString(),
        fileSize: file.size,
        fileType: file.type
      });

      setUploadProgress(100);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
    }
  };

  return (
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