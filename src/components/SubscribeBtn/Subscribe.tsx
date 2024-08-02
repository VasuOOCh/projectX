'use client'
import { toggleSubscribe } from '@/lib/actions';
import { useAuth } from '@clerk/nextjs';
import React, { useState } from 'react'

const Subscribe = ({channelUserStr} : {channelUserStr : string}) => {
    const { userId } = useAuth();
    const channelUser = JSON.parse(channelUserStr)
    
  const toggleSubscribeAction = async () => {
    try {
      const resp : any = await toggleSubscribe(channelUser.userId);
      setSubscribed((prev) => (
        resp.subscribers.includes(userId)
      ))
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const [subscribed, setSubscribed] = useState<boolean>(channelUser.subscribers.includes(userId));

  return (
    <div onClick={toggleSubscribeAction} className={subscribed ? "ring-1 w-fit ring-white bg-black text-white p-1 px-2 rounded-2xl cursor-pointer" : " bg-white text-black p-1 w-fit px-2 rounded-2xl cursor-pointer"}>
    {
      subscribed ? "Subscribed" : 'Subscribe'
    }
  </div>
  )
}

export default Subscribe