import React, { useState } from 'react';
import search from '../assets/search.svg';
import account from '../assets/account.png';
import { useAuth } from '../context/AuthProvider';
import useGetAllUsers from '../context/useGetAllUsers';
import useConversation from '../zustand/useConversation';

const Navbar = () => {
    const [searchQuery, setSearch] = useState("");
    const [allUser] = useGetAllUsers();
    const { setSelectedConversation } = useConversation();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchQuery) return;
        const conversation = allUser.find((user) =>
            user.fullname.toLowerCase() === searchQuery.toLowerCase()
        );
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch('');
        } else {
            alert('User not found');
        }
    };

    const { authUser } = useAuth();

    return (
        <div className='h-[10vh]'>
            <div className='w-full h-16 ml-[5%] shadow-lg shadow-slate-400 flex'>
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        className='w-[400px] border pl-9 border-gray-600 p-1 m-3 rounded-full'
                        type="text"
                        placeholder='Search content, message or option here'
                        value={searchQuery}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <img
                        src={search}
                        alt="Search"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8"
                    />
                </form>
                <div className='bg-indigo-500 w-full ml-[700px] p-2 pl-20 flex gap-28'>
                    <h1 className='text-white font-bold pt-2'>
                        {authUser.user.fullname}
                    </h1>
                    <img className='w-12' src={account} alt="User account" />
                </div> 
            </div>  
        </div>
    );
};

export default Navbar;
