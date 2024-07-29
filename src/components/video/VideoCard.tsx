import React, { useEffect } from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from 'next/link';
import Image from 'next/image';
import { format, render, cancel, register } from 'timeago.js';

type video = {
    title :string;
    desc : string;
    tags : [string],
    userId : string,
    _id : string,
    likes : [string],
    dislikes : [string],
    thumbnail : string,
    views : number,
    createdAt : Date
  }

async function getUser(userId : string) {
    try {
        const res = await fetch('http://localhost:3000/api/users/' + userId);
        if(!res.ok) {
            throw new Error('Erron in fetching user')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}



const VideoCard = async ({video} : {video:video} ) => {
    const user = await getUser(video.userId);
    // console.log(user);

    return (
        <Link href={'view/' + video._id} className='w-full sm:w-[45%] xl:w-[30%]'>
            <div className='flex flex-col gap-3'>
                <div className='bg-gray-400 rounded-md h-[200px] relative overflow-hidden ring-1'>
                    <Image className='object-cover' alt='video' src={video?.thumbnail || 'https://pbs.twimg.com/media/F81lbAYbgAA6ve4.jpg'} fill sizes='100%' />
                </div>

                <div className='flex gap-2 items-start'>
                    <div className='rounded-full h-10 w-10 bg-gray-400 relative overflow-hidden'>
                        <Image src={user?.avatar} alt='img' fill sizes='100%' />
                    </div>
                    <div className='flex-[1] flex flex-col gap-1'>
                        <h1 className='font-medium'>{video.title}</h1>
                        <h2 className='text-xs text-gray-500'>{user.firstName} {user.lastName} • {format(video.createdAt)} </h2>
                        <div className='flex items-center gap-4 text-xs'>
                            <div className='text-sm'>
                                {video.views} views
                            </div>

                            <div className='flex items-center gap-1'>
                                <EqualizerIcon className='text-sm' />
                                <span>23M</span>
                            </div>

                            <div className='flex gap-2'>
                                {video.tags.map((tag,index) => (
                                    index < 2 && <div key={index} className='bg-[--bg-black-tert] rounded-md p-1'>{tag}</div>
                                ))}
                                
                                
                            </div>
                        </div>


                    </div>
                </div>
            </div></Link>
    )
}

export default VideoCard