"use client";
import { UploadButton } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { useState } from 'react'
import "@uploadthing/react/styles.css";

const Upload = () => {
  const [video,setVideo] = useState<boolean>(false);

  return (
    <div className='flex items-center gap-2'>
      <UploadButton
      className='w-fit'
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        console.log(res);
        setVideo(true);
        // router.push('/view/' + res[0].serverData.videoData._id)
        alert('Upload completed')
      }}
      onUploadError={(error: Error) => {
        console.log(error);
        alert(`ERROR! ${error.message}`);
      }}
    />
    {
      video && (
        <span className='text-sm text-green-500'>Video uploaded ✓</span>
      )
    }
    </div>
  )
}

export default Upload