import Image from 'next/image'
import React from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import { Flag } from '@mui/icons-material';

const VideoPage = () => {
  return (
    <div className='flex gap-2 h-[calc(100vh-80px)] p-4'>
      <div className='w-4/5 flex flex-col gap-2'>
        <div className='bg-gray-400 rounded-md h-[500px] relative overflow-hidden ring-1'>
          <Image alt='video' src={'https://pbs.twimg.com/media/F81lbAYbgAA6ve4.jpg'} fill sizes='100%' />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-medium'>Some random title of the video</h1>
          <div className='flex items-center justify-between'>

            <div className='flex gap-4 items-center'>

              <div className='rounded-full h-12 w-12 bg-gray-400 relative overflow-hidden'>
                <Image src={'https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='img' fill sizes='100%' />
              </div>
              <div className='sfontx-'>
                <h2>Channel name</h2>
                <span className='text-sm'>34k subscribers</span>
              </div>
              <div className='rounded-3xl py-1 px-2 bg-white text-black font-semibold text-sm ring-1 ring-white'>
                Subscribe
              </div>

            </div>

            <div className='flex gap-4 items-center'>

              <div className='flex gap-1 item items-center'>
                <ThumbUpOffAltIcon />
                <span>Like</span>
              </div>
              <div className='flex gap-1 item items-center'>
                <ThumbDownOffAltIcon />
                <span>Dislike</span>
              </div>
              <div className='flex gap-1 item items-center'>
                <ShareIcon />
                <span>Share</span>
              </div>
              <div className='flex gap-1 item items-center'>
                <Flag />
                <span>Report</span>
              </div>

            </div>

          </div>
        </div>
      </div>
      <div className='w-2/5 hidden lg:block'>
        hello
      </div>
    </div>
  )
}

export default VideoPage