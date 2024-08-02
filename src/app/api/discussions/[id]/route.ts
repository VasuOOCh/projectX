import { Comment } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest,{params} : {params : any}) => {
    try {
        const comments = await Comment.find({
            videoId: params.id
        }).populate('user').sort({createdAt : -1});
        

        return NextResponse.json(comments, {status :200})
        
    } catch (error) {
        return NextResponse.json({
            error : "Error in fetching comments"
        }, {
            status : 500
        })
    }
    
}