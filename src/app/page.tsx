import HomeOptions from "@/components/homeOptions/HomeOptions";
import Sidebar from "@/components/sidebar/Sidebar";
import VideoCard from "@/components/video/VideoCard";
import { auth, currentUser } from "@clerk/nextjs/server";

type video = {
  title: string;
  desc: string;
  tags: [string],
  user: any,
  _id: string,
  likes: [string],
  dislikes: [string],
  thumbnail: string,
  views: number,
  createdAt: Date
}

const fetchVideos = async () => {

  try {
    const res = await fetch('http://localhost:3000/api/video', { cache: 'no-cache' });

    if (!res.ok) {
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

    <div className="flex flex-row h-[calc(100vh-80px)] gap-1 overflow-y-auto noScrollbar">
      <div className="w-full lg:w-3/4 flex flex-col gap-4 p-4">
        <HomeOptions />
        <div className=" flex flex-wrap gap-8 justify-between ">
          {
            videos.map((video: video) => (
              <VideoCard size="large" key={video._id} videoStr={JSON.stringify(video)} />
            ))
          }
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/4 p-4 sticky top-0 left-0 bg-[--bg-black-sec]">
        <Sidebar />
      </div>
    </div>
  );
}
