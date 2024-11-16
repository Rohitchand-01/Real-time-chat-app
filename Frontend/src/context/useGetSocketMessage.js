import React, { useEffect } from 'react';
import { useSocketContext } from './SocketContext';
import useConversation from '../zustand/useConversation.js';

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessage } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessage((prevMessages) => [...prevMessages, newMessage]);
    };

    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, setMessage]);

  // No need to return anything unless you want to expose some state or methods
};

export default useGetSocketMessage;
