'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Flag } from '@mui/icons-material';
import axios from 'axios'
import { useAuth } from '@clerk/nextjs';
import { addView } from '@/lib/actions';
// const fetcher = (...args) => fetch(...args).then(res => res.json())

const VideoOptions = ({videoString,userString} : {videoString:string, userString : string}) => {    
    const video = JSON.parse(videoString);
    const user = JSON.parse(userString)
    const {userId} = useAuth();
    
    const [likeState,setLikeState] = useState<{isLiked : boolean, count : number}>({isLiked : video.likes.includes(userId), count : video.likes.length})
    const [dislikeState,setDislikeState] = useState<{isDisliked : boolean, count : number}>({isDisliked : video.dislikes.includes(userId), count : video.dislikes.length})

    useEffect(() => {
            addView(video._id)
            .then((resp) => {
                // console.log(resp);
            })
            .catch((err) => {
                console.log(err);
                
            })
    },[])

    const like = async () => {
        try {
            const {data} = await axios.put('http://localhost:3000/api/video/like/' + video._id);
        
        setLikeState((prev) => {
            return {
                isLiked : data.likes.includes(userId),
                count : data.likes.length
            }
        })

        setDislikeState((prev) => {
            return {
                isDisliked : data.dislikes.includes(userId),
                count : data.dislikes.length
            }
        })
        } catch (error) {
            console.log(error);
            
        }
    }
    const dislike = async () => {
        try {
            const {data} = await axios.put('http://localhost:3000/api/video/dislike/' + video._id);

        setDislikeState((prev) => {
            return {
                isDisliked : data.dislikes.includes(userId),
                count : data.dislikes.length
            }
        })

        setLikeState((prev) => {
            return {
                isLiked : data.likes.includes(userId),
                count : data.likes.length
            }
        })
        } catch (error) {
            console.log(error);
            
        }

    }



  return (
    <div className='flex flex-col gap-2'>
          
          <div className='flex items-center justify-between'>

            <div className='flex gap-4 items-center'>

              <div className='rounded-full h-10 w-10 bg-gray-400 relative overflow-hidden'>
                <Image src={user.avatar} alt='img' fill sizes='100%' />
              </div>
              <div className='flex flex-col'>
                <h2>{user.firstName} {user.lastName}</h2>
                <span className='text-sm'>34k subscribers</span>
              </div>
              <div className='rounded-3xl py-1 px-2 bg-white text-black font-semibold text-sm ring-1 ring-white'>
                Subscribe
              </div>

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