
import React from 'react'
import Sidebar from "@/components/sidebar/Sidebar";
import VideoCard from "@/components/video/VideoCard";
import { auth, currentUser } from "@clerk/nextjs/server";
import axios from 'axios';
import HomeOptions from '@/components/homeOptions/HomeOptions';

type video = {
  title: string;
  desc: string;
  tags: [string],
  userId: string,
  _id: string,
  likes: [string],
  dislikes: [string],
  thumbnail: string,
  views: number,
  createdAt: Date
}


const fetchVideos = async () => {

    try {
      const { getToken } = auth();
    const token = await getToken();

      const res = await fetch('http://localhost:3000/api/video/subscriptions', { cache: 'no-cache' ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      
      if (!res.ok) {
        throw new Error("Error in fetching videos")
      }
      return res.json()
    } catch (error) {
      console.log(error);
  
    }
  }
const Subscriptions = async () => {
    const videos = await fetchVideos();
    console.log(videos);
    

  return (
    <div className="flex flex-row h-[calc(100vh-80px)] gap-1">
      <div className="w-4/5 flex flex-col gap-4 p-4">
      <HomeOptions />
        <div className=" flex flex-wrap gap-8 justify-between overflow-y-auto">
          {
            videos.map((video: video) => (
              <VideoCard size='large' key={video._id} videoStr={JSON.stringify(video)} />
            ))
          }
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/5 p-4 sticky top-0 left-0 bg-[--bg-black-sec]">
        <Sidebar />
      </div>
    </div>
  )
}

export default Subscriptions