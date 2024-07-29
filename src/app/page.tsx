import Sidebar from "@/components/sidebar/Sidebar";
import VideoCard from "@/components/video/VideoCard";
import { auth, currentUser } from "@clerk/nextjs/server";

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

const fetchVideos = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/video', {cache : 'no-cache'});
    // console.log(res);
    
    if(!res.ok) {
      throw new Error("Error in fetching videos")
    }
    return res.json()
  } catch (error) {
    console.log(error);
    
  }
}


export default async function Home() {

  const videos = await fetchVideos();  

  return (
    
      <div className="flex flex-row h-[calc(100vh-80px)] gap-1">
        <div className="w-4/5 flex flex-wrap gap-8 justify-between p-4 overflow-y-auto">
          {
            videos.map((video : video) => (
              <VideoCard key={video._id} video={video} />
            ))
          }
        </div>
        <div className="hidden lg:block lg:w-1/5 p-4 sticky top-0 left-0 bg-[--bg-black-sec]">
          <Sidebar />
        </div>
      </div>
  );
}
