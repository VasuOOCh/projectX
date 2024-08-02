import { Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type requestParams = {
    id : string
}

export const GET = async (req : NextRequest, {params} : {params : requestParams}) => {
    
    try {
        connectToDb()
        const video = await Video.findById(params.id).populate('user')
        
        return NextResponse.json(video, {
            status : 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error : "No video found"
        }, {
            status : 500
        })
        
    }
}