"use client";
import { UploadButton } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import "@uploadthing/react/styles.css";

const UploadThumbnail = () => {
    const [thumbnail, setThumbnail] = useState<boolean>(false);
    const router = useRouter()
    return (
        <div className='flex items-center gap-2'>
            <UploadButton
                className='w-fit'
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    console.log(res);
                    setThumbnail(true);
                    // router.push('/view/' + res[0].serverData.videoData._id)
                    alert('Upload completed')
                }}
                onUploadError={(error: Error) => {
                    console.log(error);
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {
                thumbnail && (
                    <span className='text-sm text-green-500'>Thumbail Uploaded ✓</span>
                )
            }
        </div>
    )
}

export default UploadThumbnail;