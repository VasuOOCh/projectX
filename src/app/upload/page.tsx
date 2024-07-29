'use client'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Add } from '@mui/icons-material';
import { UploadButton } from '@/lib/uploadthing';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { uploadVideo } from '@/lib/actions';
import Link from 'next/link';

type uploadInfo = {
  url: string
}

const UploadVideo = () => {
  const [value, setValue] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [thumbInfo, setThumbInfo] = useState<uploadInfo>({ url: '' });
  const [videoInfo, setVideoInfo] = useState<uploadInfo>({ url: '' });

  const [state, formAction] = useFormState(uploadVideo.bind(null, {
    value, tags, thumbInfo, videoInfo
  }), { success: '', error: '' ,link : ''})


  const addTag = async () => {
    setTags((prev) => [...prev, currentTag]);
    setCurrentTag('')
  }

  return (
    <div className='flex'>

      <form className='flex flex-1 flex-col gap-4 p-4' action={formAction}>
        <h1 className='text-xl'>Upload a video</h1>
        <input className='bg-[--bg-black-sec] p-2 rounded-md' type="text" placeholder='Title' name='title' />
        <div className='flex gap-2 items-center'>
          <input value={currentTag} onChange={(e) => setCurrentTag(e.target.value)} className='bg-[--bg-black-sec] p-2 rounded-md w-[150px]' type="text" placeholder='Add a tag' />
          <button type='button' onClick={addTag}>
            <Add className='rounded-full hover:bg-[--bg-black-tert]' />
          </button>
          {
            tags.map((tag,index) => (
              <div key={index} className='ring-1 ring-gray-400 text-sm py-1 px-2 rounded-2xl'>{tag}</div>
            ))
          }

        </div>
        <div className='text-sm text-gray-500'>
            *Only the first two tags will be featured in homepage
          </div>

        <ReactQuill theme="snow" className='h-80' value={value} onChange={setValue} />
        <br />
        <button className='bg-[--bg-black-tert] w-fit p-2 px-4 rounded-md' type='submit'>Upload</button>
        {
          state.error && (
            <span className='text-sm text-red-600'>{state.error}</span>
          )
        }
        {
          state.success && (
            <span className='text-sm text-green-600'>{state.success}</span>
          )
        }
        {
          state.link && (
            <Link className='text-gray-400 text-md' href={state.link}>Go to video </Link>
          )
        }
      </form>

      <div className='flex flex-1 flex-col gap-8 justify-center items-center p-4'>
        <div className='flex gap-1 flex-col w-fit items-center'>
          <h2>Upload video</h2>
          {/* bring the wholw component here */}
          <UploadButton
            className='w-fit'
            endpoint="videoUploader"
            onClientUploadComplete={(res) => {
              setVideoInfo(res[0]);
            }}
            onUploadError={(error: Error) => {
              console.log(error);
              alert(`ERROR! ${error.message}`);
            }}
          />
          {
            videoInfo.url && (
              <span className='text-sm text-green-500'>Video uploaded ✓</span>
            )
          }
        </div>

        <div className='flex gap-1 flex-col w-fit items-center'>
          <h2>Upload thumbnail</h2>
          {/* bring the wholw component here */}
          <UploadButton
            className='w-fit'
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setThumbInfo(res[0]);
            }}
            onUploadError={(error: Error) => {
              console.log(error);
              alert(`ERROR! ${error.message}`);
            }}
          />
          {
            thumbInfo?.url && (
              <div className='flex flex-col gap-4'>
                <span className='text-sm text-green-500'>Thumbail Uploaded ✓</span>
                <div className='h-[100px] w-[150px] relative bg-[--bg-black-tert]'>
                <Image className='rounded-md object-cover' fill src={thumbInfo.url} alt='Thumbnail' />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default UploadVideo