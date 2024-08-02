'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';

import { Flag } from '@mui/icons-material';
import axios from 'axios'
import { useAuth } from '@clerk/nextjs';
import { addView, toggleSubscribe } from '@/lib/actions';
import Subscribe from '../SubscribeBtn/Subscribe';
// const fetcher = (...args) => fetch(...args).then(res => res.json())

const VideoOptions = ({ videoString }: { videoString: string }) => {
  const video = JSON.parse(videoString);
  
  const { userId } = useAuth();

  const [likeState, setLikeState] = useState<{ isLiked: boolean, count: number }>({ isLiked: video.likes.includes(userId), count: video.likes.length })
  const [dislikeState, setDislikeState] = useState<{ isDisliked: boolean, count: number }>({ isDisliked: video.dislikes.includes(userId), count: video.dislikes.length })
  const [subscribed, setSubscribed] = useState<boolean>(video.user.subscribers.includes(userId));

  useEffect(() => {
    addView(video._id)
      .then((resp) => {
        // console.log(resp);
      })
      .catch((err) => {
        console.log(err);

      })
  }, [])

  const like = async () => {
    try {
      const { data } = await axios.put('http://localhost:3000/api/video/like/' + video._id);

      setLikeState((prev) => {
        return {
          isLiked: data.likes.includes(userId),
          count: data.likes.length
        }
      })

      setDislikeState((prev) => {
        return {
          isDisliked: data.dislikes.includes(userId),
          count: data.dislikes.length
        }
      })
    } catch (error) {
      console.log(error);

    }
  }
  const dislike = async () => {
    try {
      const { data } = await axios.put('http://localhost:3000/api/video/dislike/' + video._id);

      setDislikeState((prev) => {
        return {
          isDisliked: data.dislikes.includes(userId),
          count: data.dislikes.length
        }
      })

      setLikeState((prev) => {
        return {
          isLiked: data.likes.includes(userId),
          count: data.likes.length
        }
      })
    } catch (error) {
      console.log(error);

    }

  }

  const toggleSubscribeAction = async () => {
    try {
      const resp : any = await toggleSubscribe(video.user.userId);
      setSubscribed((prev) => (
        resp.subscribers.includes(userId)
      ))
      
    } catch (error) {
      console.log(error);
      
    }
  }



  return (
    <div className='flex flex-col gap-2'>

      <div className='flex items-center justify-between'>

        <div className='flex gap-4 items-center'>

          <div className='rounded-full h-10 w-10 bg-gray-400 relative overflow-hidden'>
            <Image src={video.user.avatar} alt='img' fill sizes='100%' />
          </div>
          <div className='flex flex-col'>
            <h2>{video.user.firstName} {video.user.lastName}</h2>
            <span className='text-sm'>34k subscribers</span>
          </div>
          <Subscribe channelUserStr={JSON.stringify(video.user)} />

        </div>

        <div className='flex gap-4 items-center'>

          <div onClick={like} className='flex gap-1 item items-center'>
            {
              likeState.isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />
            }
            <span>{likeState.count}</span>
          </div>
          <div onClick={dislike} className='flex gap-1 item items-center'>
            {
              dislikeState.isDisliked ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />
            }
            <span>{dislikeState.count}</span>

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
  )
}

export default VideoOptions