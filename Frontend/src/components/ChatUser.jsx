import React from 'react'
import person from '../assets/person.png';
import useConversation from "../zustand/useConversation.js";
import { useSocketContext } from '../context/SocketContext.jsx';

const ChatUser = () => {
    const {selectedConversation}= useConversation()
    const {onlineUsers} = useSocketContext()
    const getOnlineUsersStatus=(userId)=>{
        return onlineUsers.includes(userId)?"Online":"Offline"
    }

    // console.log(selectedConversation);
    return (
        <div className=' h-[8vh]'>
            <div className="flex gap-5 items-center justify-center h-[8vh] bg-slate-600 text-white p-1 hover:bg-slate-700 duration-300">
                <div className="w-[35px]  rounded-full bg-black items-center justify-center">
                    <img className=' w-[35px] p-1' src={person} />
                </div>
                <div>
                    <h1 className=' text-lg font-semibold'>{selectedConversation.fullname}</h1>
                    <span>{getOnlineUsersStatus(selectedConversation._id)}</span>
                </div>
            </div>
        </div>
    )
}

export default ChatUser
