import React, { useState } from 'react';
import Send from '../assets/Send.png';
import useSendMessage from '../context/useSendMessage.js';

const TypeSend = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!message.trim()) return; // Avoid sending empty messages

    await sendMessage(message);
    setMessage(''); // Clear the input field after sending
  };

  return (
    <form onSubmit={handleSubmit} className="fixed bg-indigo-100 w-full">
      <div className="flex items-center gap-8 p-3">
        {/* Input field */}
        <input
          className="w-[900px] border pl-9 border-gray-600 p-1 rounded-xl pt-2 pb-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a Message Here....." 
        />
        
        {/* Submit button */}
        <button type="submit">
          <img 
            className="w-[40px] h-[40px]" 
            src={Send}
          />
        </button>
      </div>
    </form>
  );
};

export default TypeSend;
