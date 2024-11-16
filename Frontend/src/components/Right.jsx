import React, { useEffect } from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeSend from './TypeSend';
import useConversation from '../zustand/useConversation.js';
import { useAuth } from '../context/AuthProvider.jsx';

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    setSelectedConversation(null);
    // Cleanup function only if necessary.
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className='w-[70%]'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <ChatUser />
          <div
            className='flex-1 overflow-y-auto'
            style={{ maxHeight: 'calc(80vh - 8vh)' }}
          >
            <Messages />
          </div>
          <TypeSend />
        </>
      )}
    </div>
  );
};

export default Right;

const NoChatSelected = () => {
  const { authUser } = useAuth();
  console.log(authUser) // Fixed destructuring to match `useAuth` return value structure.
  
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1 className='text-center'>
        Welcome{' '}
        <span className='font-semibold text-xl'>{authUser.user.fullname}</span>
        <br />
        No chat selected, please start a conversation by selecting someone from
        your contacts.
      </h1>
    </div>
  );
};
