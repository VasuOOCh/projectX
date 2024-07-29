import { Video } from "@/lib/models";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: any }) => {
    

    try {
        const { id } = params;
        const { userId } = auth();
    
        if (!userId) {
            return NextResponse.json({
                error : "Unauthorized"
            }, { status: 401 });
        }
    
        const updatedVideo = await Video.findByIdAndUpdate(id, {
            $addToSet: { likes: userId},
            $pull : {dislikes : userId}
        },{new : true})
        
        return NextResponse.json(updatedVideo, {
            status : 200
        })
    } catch (error) {
        return NextResponse.json({
            error: "Error in liking the video"
        }, {
            status: 500
        })
    }

}