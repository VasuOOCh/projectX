import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://images.pexels.com/photos/4009599/pexels-photo-4009599.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    subscribers : [String],
    subscribedUsers : [String]

}, { timestamps: true });

const VideoSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    tags: [String],
    likes: [String],
    dislikes: [String],
    views: {
        type: Number,
        default: 0
    }
}, {timestamps : true})

const commentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
    },
    videoId : {
        type : String,
        required : true
    },
    likes : [String],
    dislikes: [String]
}, {timestamps : true})

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Video = mongoose.models?.Video || mongoose.model("Video", VideoSchema);
export const Comment = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);