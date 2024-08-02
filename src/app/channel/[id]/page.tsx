import Subscribe from '@/components/SubscribeBtn/Subscribe';
import VideoCard from '@/components/video/VideoCard';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image';
import React from 'react'

const fetchChannel = async (id : string) => {
  try {
    const resp = await fetch('http://localhost:3000/api/video?userId=' + id, {cache : 'no-cache'});
    
    if(!resp.ok) {
      return "Error in fetching videos"
    }
    return resp.json()
  } catch (error) {
    console.log(error);
    
  }
}

const fetchUser = async (id : string) => {
  try {
    const resp = await fetch('http://localhost:3000/api/users/' + id, {cache : 'no-cache'});
    
    if(!resp.ok) {
      return "Error in fetching user"
    }
    return resp.json()
  } catch (error) {
    console.log(error);
    
  }
}

const ChannelPage =async ({params} : {params : Params}) => {
  const {id} = params; // id is userId
  const user = await fetchUser(id);
  const videos = await fetchChannel(user._id);
  
  return (
    <div className='flex gap-12 overflow-y '>

      {/* Showing channel */}
      <div className='w-full md:w-2/3 flex flex-col gap-8'>

        <div className='h-[200px] relative bg-[--bg-black-tert]'  >
          <Image src={'https://images.pexels.com/photos/163046/welcome-to-our-home-welcome-tablet-an-array-of-163046.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} fill alt='channel_banner' className='object-cover rounded-md' />
        </div>

        {/* Main channel info */}
        <div className='flex gap-4 items-center'>
            <div className='h-28 w-28 relative'>
              <Image src={user.avatar} fill alt='user_image' className='rounded-full object-cover' />
            </div>
            <div className='flex flex-col gap-2'>
              <h1 className='font-semibold'>{user.firstName} {user.lastName} <span className='text-sm text-gray-400'>@{user.userId} </span></h1>
              
              <h3 className='text-sm text-gray-400'>{user.subscribers.length} subscribers • {videos.length} videos</h3>
              {/* <p className='text-wrap text-sm w-fit'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat nobis neque consequuntur, quas, ipsam optio, autem pariatur nostrum atque nulla fugiat eius error maxime ea nesciunt ut doloremque? Ipsa, ducimus.</p> */}
              
              <Subscribe channelUserStr={JSON.stringify(user)} />
            </div>


        </div>

        {/* Videos section  */}
        <div className='flex flex-col gap-4 mb-4'>
          <h2 className='text-2xl'>Channel Videos</h2>

          <div className='flex flex-wrap gap-4 justify-between'>
            {videos.map((video : any) => (
              <VideoCard size='small' key={video._id} videoStr={JSON.stringify(video)} />
            ))}
          </div>
        </div>

      </div>

      {/* showing channel stats */}
      <div className='hidden md:block w-1/3 bg-[--bg-black-sec] sticky top-0 left-0'>
            hello
      </div>
    </div>
  )
}

export default ChannelPage