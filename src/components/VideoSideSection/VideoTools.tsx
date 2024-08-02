'use client'
import React, { useState } from 'react'
import ForumIcon from '@mui/icons-material/Forum';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Discussions from '../discussions/Discussions';
import Questions from '../questions/Questions';
import PersonIcon from '@mui/icons-material/Person';

const VideoTools = ({videoId, currentUserStr} : {videoId : string, currentUserStr : string}) => {

    const [activeSection, setactiveSection] = useState<string>("discussions")

    return (
        <div className='px-4  flex flex-col gap-4'>
            <div className='flex gap-1 justify-between items-center text-sm'>
                <div className='videoToolsSection flex-1' onClick={() => setactiveSection("discussions")}>
                    <ForumIcon className='text-[20px]' />
                    <h2>Discussions</h2>
                </div>
                <div className='videoToolsSection flex-1' onClick={() => setactiveSection("questions")}>
                    <LocalFireDepartmentIcon className='text-[20px]' />
                    <h2>Questions</h2>
                </div>
                <div className='videoToolsSection flex-1' onClick={() => setactiveSection("references")}>
                    <PersonIcon className='text-[20px]' />
                    <h2>Join Live</h2>
                </div>
            </div>

            <div className='h-[500px]'>
                {
                    activeSection == "discussions" ? (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%] overflow-y-auto'>
                            <Discussions currentUserStr={currentUserStr} videoId={videoId} />
                        </div>

                    ) : activeSection == "questions" ? (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%]'>
                            <Questions />
                        </div>
                    ) : (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%]'>
                            Live chat
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VideoTools