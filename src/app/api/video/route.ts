import { Video } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {


    try {
        await connectToDb()
        const videos = await Video.find();

        return NextResponse.json(videos, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json("error occured in fetching videos", {
            status: 500
        })

    }
}