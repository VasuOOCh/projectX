
import Image from 'next/image'
import React from 'react'

import VideoTools from '@/components/VideoSideSection/VideoTools';
import RecmVideo from '@/components/RecmVideo/RecmVideo';
import DOMPurify from "isomorphic-dompurify";
import VideoOptions from '@/components/videoOptions/VideoOptions';
type requestParams = {
  id: string
}

async function getVideo(id: string) {
  try {
    const res = await fetch('http://localhost:3000/api/video/' + id, { cache: "no-cache" });
    if (!res.ok) {
      throw new Error("Something went wrong")
    }

    return res.json();
  } catch (error) {
    console.log(error);

  }
}

async function getUser(userId: string) {
  try {
    const res = await fetch('http://localhost:3000/api/users/' + userId, { cache: 'default' });
    if (!res.ok) {
      throw new Error("Something went wrong")
    }

    return res.json()
  } catch (error) {
    console.log(error);

  }
}

const VideoPage = async ({ params }: { params: requestParams }) => {

  const video = await getVideo(params.id);
  const user = await getUser(video?.userId);


  return (
    <div className='flex gap-2 h-[calc(100vh-80px)] p-4 '>
      <div className='w-4/5 flex flex-col gap-2'>
        <div className='bg-gray-400 rounded-md min-h-[500px] relative overflow-hidden ring-1'>
          <video className='h-[100%] w-[100%] object-contain' controls>
            <source src={video.link} type='video/mp4' />
            Error in loading video
          </video>
        </div>

        <div className='flex flex-col'>
          <h1 className='text-xl font-medium my-2'>{video.title}</h1>
          <div className='flex gap-2'>
            {video.tags.map((tag: any) => (
              <div className='bg-[--bg-black-tert] rounded-md p-1 px-2 text-sm'>{tag}</div>
            ))}

          </div>
        </div>

        {/* stats section of the video */}
        <VideoOptions userString={JSON.stringify(user)} videoString={JSON.stringify(video)} />

        {/* desc section of the video */}

        <div className='bg-[--bg-black-sec] rounded-md p-2'>
          <span className='text-xs'>{video.views} views</span>
          <h2 className='text-xl text-gray-200 font-semibold'>Desciption : </h2>
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(video.description) }} className='py-2'>
          </div>
        </div>

      </div>
      <div className='w-2/5 hidden lg:block flex flex-col gap-2'>
        <VideoTools />
        <div className='p-4 flex flex-col gap-2'>
          <h1 className='text-lg'>Recommendations</h1>
          <div className='flex flex-col gap-4'>
            <RecmVideo />
            <RecmVideo />
            <RecmVideo />
            <RecmVideo />
            <RecmVideo />
            <RecmVideo />
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPage