import { Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest) => {
    try {
        // make q and tags required even if it is empty
        
        const tags = req.nextUrl.searchParams.get('tags')?.split(',');
        
        const query = req.nextUrl.searchParams.get('q');
        
        const queryObj : any = {};
        if(tags && tags[0] && tags.length > 0)  {
            queryObj.tags = {$in : tags};
        }
        if(query) { 
            queryObj.$or = [{title : {$regex : query, $options : "i"}}, {description : {$regex : query, $options : "i"}}]
        }

        if(!queryObj.tags && !queryObj.$or){
            return NextResponse.json({
                error : "Please enter query or tags"
            }, {
                status : 400
            })
            
        }     
        
        await connectToDb();
        const videos = await Video.find(queryObj).populate('user');
        
        return NextResponse.json(videos, {
            status : 200
        }) 
        
        // request : /api/video/search?q="abc"&tags=""
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error : "SOmething went wrong | Fetching failed for recem videos"
        }, {
            status : 500
        })
        
        
    }
}