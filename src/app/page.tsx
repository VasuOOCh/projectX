import Sidebar from "@/components/sidebar/Sidebar";
import VideoCard from "@/components/video/VideoCard";
import { auth, currentUser } from "@clerk/nextjs/server";


export default async function Home() {

  return (
    
      <div className="flex flex-row h-[calc(100vh-80px)] gap-1">
        <div className="w-4/5 flex flex-wrap gap-8 justify-between p-4 overflow-y-auto">
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
          <VideoCard /> 
        </div>
        <div className="hidden lg:block lg:w-1/5 p-4 sticky top-0 left-0 bg-[--bg-black-sec]">
          <Sidebar />
        </div>
      </div>
  );
}
