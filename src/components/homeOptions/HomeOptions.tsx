'use client'
import axios from 'axios';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const HomeOptions = () => {
    const pathname = usePathname();

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex gap-3 text-sm w-fit">
            <Link href={'/'}><div className={`rounded-2xl px-2 py-1 ${pathname == '/' ? "bg-[--bg-black-tert]" : "bg-[--bg-black-sec]"}`}>Home</div></Link>
            <Link href={'/feed/subscriptions'}><div className={`rounded-2xl px-2 py-1 ${pathname == '/feed/subscriptions' ? "bg-[--bg-black-tert]" : "bg-[--bg-black-sec]"}`}>Subscribed</div></Link>
            <div className={`rounded-2xl px-2 py-1 ${pathname == '/popular' ? "bg-[--bg-black-tert]" : "bg-[--bg-black-sec]"}`}>Popular</div>
        </div>
        <div className='flex flex-wrap gap-3 text-sm'>
            <Link href={'/search?q=&tags=' + "tag"}><div className='rounded-2xl px-2 py-1 bg-purple-600'>tag</div></Link>
            <div className='rounded-2xl px-2 py-1 bg-purple-600'>web</div>
            <div className='rounded-2xl px-2 py-1 bg-purple-600'>dsa</div>
            <div className='rounded-2xl px-2 py-1 bg-purple-600'>google</div>
            <div className='rounded-2xl px-2 py-1 bg-purple-600'>apple</div>
            <div className='rounded-2xl px-2 py-1 bg-purple-600'>javascript</div>

        </div>
        </div>
    )
}

export default HomeOptions