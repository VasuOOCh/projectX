import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { format } from 'timeago.js'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';

async function getUser(userId: string) {
    try {
        const res = await fetch('http://localhost:3000/api/users/' + userId);
        if (!res.ok) {
            throw new Error('Erron in fetching user')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

const SingleComment = ({ comment }: { comment: any }) => {

    return (
        <div className='flex gap-2'>
            <div className='h-8 w-8 rounded-full overflow-hidden bg-[--bg-black-tert] relative'>
                <Image alt='userImg' src={comment.user.avatar} fill className='object-cover' />
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex justify-between text-xs'>
                    <h2 className=''>{comment.user.firstName} {comment.user.lastName} • {format(comment.createdAt)}</h2>
                    <div><MoreVertIcon fontSize='small' /></div>
                </div>
                <span>{comment.text}</span>
                <div className='flex gap-4'>
                    <button><ThumbUpOffAltIcon /></button>
                    <button><ThumbDownOffAltIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default SingleComment