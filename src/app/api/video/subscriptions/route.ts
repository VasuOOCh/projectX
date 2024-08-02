import { User, Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    
    try {      
        
          
       const {userId}  = auth()
       const user = await User.findOne({userId});
       
       
       if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      //finding out users,with that specific userIds
      const users = await User.find({ userId: { $in: user.subscribedUsers } })
      const userObjectIds = users.map((user) => user._id) 

        await connectToDb()
        const videos = await Video.find({
            user : {$in : userObjectIds}
        }).populate('user');


        return NextResponse.json(videos, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json("Error occured in fetching videos", {
            status: 500
        })

    }
}