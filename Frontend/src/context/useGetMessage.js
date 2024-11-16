import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation.js';
import axios from 'axios';

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessage, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessage = async () => {
            if (selectedConversation && selectedConversation._id) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:3000/message/get/${selectedConversation._id}`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('ChatApp')?.token}`, // Sends the JWT token
                        },
                    });
                    setMessage(response.data);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            }
        };
        getMessage();
    }, [selectedConversation, setMessage]);

    return { loading, messages };
};

export default useGetMessage;
