import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessage from '../context/useGetMessage.js';
import Loading from '../components/Loading.jsx';
import useGetSocketMessage from '../context/useGetSocketMessage.js';

const Messages = () => {
  useGetSocketMessage();
  const { loading, messages } = useGetMessage();
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto" style={{ minHeight: "calc(80vh - 8vh)" }}>
      {!loading ? (
        <Loading />
      ) : (
        messages.length > 0 ? (
          messages.map((message, index) => (
            <Message 
              key={message.id || index}
              message={message} 
              ref={index === messages.length - 1 ? lastMessageRef : null}
            />
          ))
        ) : (
          <div>
            <p className="text-center mt-[20%]">Say, Hi to start the conversation</p>
          </div>
        )
      )}
    </div>
  );
};

export default Messages;
