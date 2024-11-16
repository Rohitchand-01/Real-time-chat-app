import React from 'react';
import person from '../assets/person.png';
import useConversation from '../zustand/useConversation.js';
import { useSocketContext } from '../context/SocketContext.jsx';

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`flex items-center px-4 py-1 hover:bg-indigo-400 duration-300 cursor-pointer rounded-lg mt-3 ${
        isSelected ? 'bg-indigo-700' : ''
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="relative w-[50px] h-[50px] rounded-full items-center justify-center bg-slate-800">
        <img className="w-[50px] p-2 " src={person} alt="" />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      <div className="ml-4">
        <p className="font-medium text-black">{user.fullname}</p>
        <span className="text-sm text-black">{user.email}</span>
      </div>
    </div>
  );
};

export default User;
