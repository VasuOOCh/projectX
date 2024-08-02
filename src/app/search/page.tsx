'use client'
import VideoCard from '@/components/video/VideoCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type video = {
  title : string,
  description : string,
  user : string,
  likes : string[],
  views : string[],
  dislikes : string[],
  tags : string[],
  _id : string
}

const SearchPage = ({searchParams} : {searchParams : {q? : string, tags? : string[]}}) => {
  const router = useRouter();
  const {q} = searchParams;
  const {tags} = searchParams;
  if(q == undefined || tags == undefined) {
    router.push(`/search?q=${q || ''}&tags=${tags || ''}`); //ensuring both exits even if empty :)
  }
  
  const [videos,setVideos] = useState<video[]>([]);

  useEffect(() => {
    try {
      const fetchResults = async () => {
        const {data} = await axios.get('http://localhost:3000/api/video/search?q=' + q + "&tags=" + tags);
        setVideos(data);
        
      }
      fetchResults()
    } catch (error) {
      console.log(error);
    }
  }, [q])
  
  return (
    <div className='flex flex-wrap gap-2'>
      {videos.map((video) => (
        <VideoCard size='large' key={video._id} videoStr={JSON.stringify(video)} />
      ))}
    </div>
  )
}

export default SearchPage