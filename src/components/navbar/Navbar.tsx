import React from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import Upload from '../UploadComp/UploadBtn';

const Navbar = () => {
    return (
        <div className='flex gap-4 p-2 h-[80px] items-center md:gap-12 sticky top-0 z-50 bg-[--bg-black-main]'>
            <Link href={'/'} className='font-bold text-lg'>
                X
            </Link>
            <div className='gap-4 hidden md:flex'>
                <Link href={'/about'}>
                    About
                </Link>
                <Link href={'/contact'}>
                    Contact
                </Link>
                <Link className='hidden md:block' href={'/privacy-policy'}>Privacy</Link>
            </div>
            <div className='flex flex-1 ring-1 ring-gray-500 p-2 gap-2 rounded'>
                <input className='outline-none flex-1' type="text" placeholder='Search anything' />
                <SearchIcon />
            </div>
            <div className='flex'>
                <SignedOut >
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <div className='flex gap-4 items-center'>
                    <Link href={'/upload'} className='flex gap-1 text-sm items-center bg-[--bg-black-tert] rounded-2xl py-1 px-2 '>
                        
                        <VideocamIcon />
                        <span>Upload</span>
                    </Link>
                    
                    <UserButton />
                    </div>
                </SignedIn>
            </div>
        </div>
    )
}

export default Navbar