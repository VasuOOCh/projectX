'use server'
import { auth } from "@clerk/nextjs/server";
import { Video } from "./models";
import { error } from "console";
import { connectToDb } from "./utils";

 

export const uploadVideo = async (MoreInfo :any,state: {success : string,error : string, link:string}, formData : FormData) => {
    try {
        const formInfo = Object.fromEntries(formData);

    const {userId} = auth();

    await connectToDb()
    const newVideo = new Video({
        title : formInfo.title,
        description : MoreInfo.value,
        thumbnail : MoreInfo.thumbInfo.url,
        link : MoreInfo.videoInfo.url,
        tags : MoreInfo.tags,
        userId
    })

    console.log(newVideo);
    await newVideo.save();    
    return {
        success : "Video successfully added",
        error : '',
        link : "/view/" + newVideo._id
    }
    
    } catch (error) {
        console.log(error);
        return {
            success : '',
            error : "Error in posting video",
            link : ''
        }
        
    }
}


export const addView = async (id :string) => {
    try {
        await Video.findByIdAndUpdate(id, {
            $inc : {views : 1}
        },{new : true});

        return {
            msg : "View added succesfully"
        };
    } catch (error) {
        console.log(error);
        return {
            error : "error in updating views"
        }    
    }
}