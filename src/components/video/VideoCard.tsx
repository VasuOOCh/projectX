import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Link from 'next/link';
import Image from 'next/image';


const VideoCard = () => {
    return (
        <Link href={'view/id'} className='w-full sm:w-[45%] xl:w-[30%]'>
            <div className='flex flex-col gap-3'>
                <div className='bg-gray-400 rounded-md h-[200px] relative overflow-hidden ring-1'>
                    <Image alt='video' src={'https://pbs.twimg.com/media/F81lbAYbgAA6ve4.jpg'} fill sizes='100%' />
                </div>

                <div className='flex gap-2 items-start'>
                    <div className='rounded-full h-12 w-12 bg-gray-400 relative overflow-hidden'>
                        <Image src={'https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600'} alt='img' fill sizes='100%' />
                    </div>
                    <div className='flex-[1] flex flex-col gap-1'>
                        <h1 className='font-medium'>Sample video title</h1>
                        <h2 className='text-sm text-gray-500'>Channel name • 3 days ago </h2>
                        <div className='flex items-center justify-between text-xs'>
                            <div className='text-sm'>
                                3k views
                            </div>

                            <div className='flex items-center gap-1'>
                                <EqualizerIcon className='text-sm' />
                                <span>23 M</span>
                            </div>

                            <div className='flex gap-2'>
                                <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 1</div>
                                <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 2</div>
                                <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 3</div>
                            </div>
                        </div>


                    </div>
                </div>
            </div></Link>
    )
}

export default VideoCard