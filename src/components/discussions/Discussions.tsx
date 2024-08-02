'use client'
import { addComment } from '@/lib/actions';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import { useFormState } from 'react-dom';
import SingleComment from '../singleComment/SingleComment';
import {useUser} from '@clerk/nextjs';

type Comment = {
  _id : string,
  text : string,
  userId : string,
  videoId : string
}

const Discussions = ({videoId,currentUserStr }: { videoId: string,currentUserStr : string }) => {

  const currentUser = JSON.parse(currentUserStr);
  console.log(currentUser);

  
  const [state, formAction] = useFormState(addComment.bind(null, { videoId}), { message: '', commentStr: '' })
  const [comments,setComments] = useState<Comment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const {data} = await axios.get('http://localhost:3000/api/discussions/' + videoId);
      
      setComments(data)
    }

    fetchComments()

  }, [])

  useEffect(() => {
    if(state.commentStr) {
      // console.log(state.comment);
      const comment = JSON.parse(state.commentStr);
      setComments((prev) => [{...comment.comment, user : comment.user},...prev])

    }
  }, [state])

  return (
    <div className='p-2 flex flex-col gap-4'>

      <form action={formAction} className='flex gap-2 items-center bg-[--bg-black-tert] p-2 rounded-3xl'>
        <div className='h-8 w-8 rounded-full overflow-hidden bg-[--bg-black-tert] relative'>
          <Image alt='userImg' src={currentUser.imageUrl} fill className='object-cover' />
        </div>
        <input className='flex-1 outline-none' type="text" name='text' placeholder='Add a comment' />
        <button>
          <SendIcon />
        </button>
      </form>
      {state?.message}

      <div className='p-2 flex flex-col gap-4'>
        {
          comments.map((comment) => (
            <Suspense fallback={'loading...'}>
              <SingleComment key={comment._id} comment={comment} />
            </Suspense>
          ))
        }
      </div>
    </div>
  )
}

export default Discussions