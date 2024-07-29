'use client'
import React, { useState } from 'react'
import ForumIcon from '@mui/icons-material/Forum';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Discussions from '../discussions/Discussions';
import Questions from '../questions/Questions';
import References from '../references/References';

const VideoTools = () => {

    const [activeSection, setactiveSection] = useState<string>("discussions")

    return (
        <div className='px-4  flex flex-col gap-4'>
            <div className='flex justify-between items-center text-sm'>
                <div className='videoToolsSection' onClick={() => setactiveSection("discussions")}>
                    <ForumIcon className='text-[20px]' />
                    <h2>Discussions</h2>
                </div>
                <div className='videoToolsSection' onClick={() => setactiveSection("questions")}>
                    <LocalFireDepartmentIcon className='text-[20px]' />
                    <h2>Questions</h2>
                </div>
                <div className='videoToolsSection' onClick={() => setactiveSection("references")}>
                    <OpenInNewIcon className='text-[20px]' />
                    <h2>References</h2>
                </div>
            </div>

            <div className='h-[500px]'>
                {
                    activeSection == "discussions" ? (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%]'>
                            <Discussions />
                        </div>

                    ) : activeSection == "questions" ? (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%]'>
                            <Questions />
                        </div>
                    ) : (
                        <div className='rounded-md bg-[--bg-black-sec] h-[100%]'>
                            <References />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VideoTools