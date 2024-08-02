import { User, Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    
    try {
        const userId = req.nextUrl.searchParams.get('userId');
        
        const queryObj : {user? : string} = {}
        if(userId) {
            queryObj.user = userId;
        }
        
        await connectToDb()
        const videos = await Video.find(queryObj).populate('user');

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