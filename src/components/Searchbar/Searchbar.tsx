'use client'
import React, { FormEvent, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Searchbar = ({searchParams}: {searchParams : any}) => {
    console.log(searchParams);
    
    const router = useRouter()
    const [query,setQuery] = useState<string>("");
    const search = async (e : FormEvent) => {
        e.preventDefault();
            router.push('/search?tags=&q=' + query);
    }


    return (
        <form onSubmit={search} className='flex flex-1 ring-1 ring-gray-500 p-2 gap-2 rounded'>
            <input value={query} onChange={(e) => setQuery(e.target.value)} className='outline-none flex-1' type="text" placeholder='Search anything' />
            <button>
            <SearchIcon />
            </button>
        </form>
    )
}

export default Searchbar