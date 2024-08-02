'use client'
import React, { useEffect } from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from 'next/link';
import Image from 'next/image';
import { format, render, cancel, register } from 'timeago.js';


const VideoCard = ({ videoStr ,size}: { videoStr: string, size :string }) => {
    const video = JSON.parse(videoStr)    

    return (

        <div className={'flex flex-col gap-3 w-full sm:w-[45%] xl:w-[30%]'}>
            <Link href={'/view/' + video._id} className="">
                <div className={`bg-gray-400 rounded-md relative overflow-hidden ring-1 h-[200px]`}>
                    <Image className='object-cover' alt='video' src={video?.thumbnail || 'https://pbs.twimg.com/media/F81lbAYbgAA6ve4.jpg'} fill sizes='100%' />
                </div>
            </Link>

            <div className='flex gap-2 items-start'>
                {
                    size != "small" && (
                        <Link className='text-grey-600 hover:text-blue-600' href={'/channel/' + video.user.userId}>
                    <div className='rounded-full h-10 w-10 bg-gray-400 relative overflow-hidden'>
                        <Image src={video.user?.avatar} alt='img' fill sizes='100%' />
                    </div>
                </Link>
                    )
                }
                <div className='flex-[1] flex flex-col gap-1'>
                    <Link href={'/view/' + video._id} className="">
                        <h1 className='font-medium'>{video.title}</h1>
                    </Link>
                    <h2 className='text-xs text-gray-500'>
                        {
                            size != "small" && (
                                <Link className='text-grey-600 hover:text-blue-600' href={'/channel/' + video.user.userId}>{video.user.firstName} {video.user.lastName} •
                        </Link> 
                            )
                        }
                         {format(video.createdAt)}
                    </h2>
                    <div className='flex items-center gap-4 text-xs'>
                        <div className='text-sm'>
                            {video.views} views
                        </div>

                        <div className='flex items-center gap-1'>
                            <EqualizerIcon className='text-sm' />
                            <span>{video.likes.length + video.views}</span>
                        </div>

                        <div className='flex gap-2'>
                            {video.tags.map((tag: string, index: number) => (
                                index < 2 && <div key={index} className='bg-[--bg-black-tert] rounded-md p-1'>{tag}</div>
                            ))}


                        </div>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default VideoCard