'use server'
import { auth } from "@clerk/nextjs/server";
import { Comment, User, Video } from "./models";
import { error } from "console";
import { connectToDb } from "./utils";

export const uploadVideo = async (MoreInfo: any, state: { success: string, error: string, link: string }, formData: FormData) => {
    try {
        const formInfo = Object.fromEntries(formData);

        const { userId } = auth();
        if (!userId) {
            return {
                success: "",
                error: 'Unauthorized',
                link: ''
            }
        }
        const user = await User.findOne({userId});

        await connectToDb()
        const newVideo = new Video({
            title: formInfo.title,
            description: MoreInfo.value,
            thumbnail: MoreInfo.thumbInfo.url,
            link: MoreInfo.videoInfo.url,
            tags: MoreInfo.tags,
            user : user._id
        })

        console.log(newVideo);
        await newVideo.save();
        return {
            success: "Video successfully added",
            error: '',
            link: "/view/" + newVideo._id
        }

    } catch (error) {
        console.log(error);
        return {
            success: '',
            error: "Error in posting video",
            link: ''
        }

    }
}


export const addView = async (id: string) => {
    // id refers to the video Id
    try {
        await Video.findByIdAndUpdate(id, {
            $inc: { views: 1 }
        }, { new: true });

        return {
            msg: "View added succesfully"
        };
    } catch (error) {
        console.log(error);
        return {
            error: "error in updating views"
        }
    }
}

export const toggleSubscribe = async (id: string) => {
    try {
        // id refers to the channel user id

        const { userId } = auth();

        const user = await User.findOne({ userId: id });
        if (user.toObject().subscribers.includes(userId)) {
            console.log("yess");
            const updatedUser = await User.findOneAndUpdate({ userId: id }, {
                $pull: { subscribers: userId }
            }, { new: true });
            await User.findOneAndUpdate({ userId: userId }, {
                $pull: { subscribedUsers: id }
            })

            return {
                subscribers: updatedUser.subscribers
            }
        } else {
            console.log("noo");
            const updatedUser = await User.findOneAndUpdate({ userId: id }, {
                $push: { subscribers: userId }
            }, { new: true });
            await User.findOneAndUpdate({ userId: userId }, {
                $push: { subscribedUsers: id }
            })
            return {
                subscribers: updatedUser.subscribers
            }
        }



    } catch (error) {
        console.log(error);
        return new Error('Could not update the subscribers')
    }
}

export const addComment = async (moreInfo : any, state: any, formData: FormData) => {
    try {
        
        await connectToDb();
        const formInfo = Object.fromEntries(formData);
        
        const {userId}  = auth();
        if(!userId) {
            return {
                message : 'unauthorized',
                commentStr : ''
            }
        }
        const user = await User.findOne({userId});
        
        
        const newComment = new Comment({
            user : user._id,
            text : formInfo.text,
            videoId : moreInfo.videoId
        })
        await newComment.save(); 
        
        
        return {
            commentStr : JSON.stringify({
                comment : newComment.toObject(),
                user : user.toObject()
            }),
            message : ''
        };

    } catch (error) {
        console.log(error);
        return {
            message : "Error in adding comment",
            commentStr : ''
        }
    }
}