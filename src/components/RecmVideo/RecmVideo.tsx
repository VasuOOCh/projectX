import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecmVideo = () => {
    return (
        <Link href={''} >
            <div className='flex gap-2'>
                <div className='bg-gray-400 rounded-md w-[180px] h-[100px] relative overflow-hidden ring-1'>
                    <Image alt='video' src={'https://pbs.twimg.com/media/F81lbAYbgAA6ve4.jpg'} fill sizes='100%' />
                </div>

                <div className='flex gap-2 items-start'>
                    <div className='flex-[1] flex flex-col gap-1'>
                        <h1 className='font-medium'>Title</h1>
                        <h2 className='text-sm text-gray-500'>Channel name </h2>
                        <div className='flex items-center gap-4 text-xs'>
                                3k views • 3 days ago
                        </div>
                        <div className='flex gap-2 text-xs'>
                                <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 1</div>
                                <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 2</div>
                                {/* <div className='bg-[--bg-black-tert] rounded-md p-1'>Tag 3</div> */}
                            </div>


                    </div>
                </div>

            </div>
        </Link>
    )
}

export default RecmVideo