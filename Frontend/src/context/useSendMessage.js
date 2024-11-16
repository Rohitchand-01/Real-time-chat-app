import { useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      if (!selectedConversation?._id) {
        console.error('No conversation selected');
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/message/send/${selectedConversation._id}`,
        { message },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('ChatApp'))?.token}`,
          },
        }
      );

      if (response.data) {
        setMessages([...messages, response.data]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
