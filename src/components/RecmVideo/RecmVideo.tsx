import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {format} from 'timeago.js'

const RecmVideo = ({ videoStr }: { videoStr: string }) => {
    const video = JSON.parse(videoStr)
    return (

            <div className='flex gap-2'>
                <Link href={'/view/' + video._id}>
                    <div className='bg-gray-400 rounded-md w-[180px] h-[100px] relative overflow-hidden ring-1'>
                        <Image alt='video' src={video.thumbnail} className='object-cover' fill sizes='100%' />
                    </div>
                </Link>

                <div className='flex gap-2 items-start'>
                    <div className='flex-[1] flex flex-col gap-1'>
                        <Link href={'/view/' + video._id}>
                            <h1 className='font-medium'>{video.title}</h1>
                        </Link>

                        <Link href={'/channel/' + video.user.userId}>
                            <h2 className='text-xs text-gray-500 hover:text-blue-500'>{video.user.firstName} {video.user.lastName} </h2>
                        </Link>
                        <div className='flex items-center gap-4 text-xs'>
                            {video.views} views • {format(video.createdAt)}
                        </div>
                        <div className='flex gap-2 text-xs'>
                            {video.tags.map((tag: string, index: number) => {
                                if (index < 2) {
                                    return <div key={index} className='bg-[--bg-black-tert] rounded-md p-1'>{tag}</div>
                                }
                            })}
                        </div>


                    </div>
                </div>

            </div>
    )
}

export default RecmVideo