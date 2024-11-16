// message.controller.js

import Conversation from '../Models/conversation.model.js';
import Message from '../Models/message.model.js';
import { getReceiverSocketId } from '../SocketIO/server.js';

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // message content from request body
        const { id: receiverId } = req.params; // receiver ID from route parameters
        const senderId = req.user._id; // sender ID from authenticated user

        // Check if a conversation between sender and receiver already exists
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = new Conversation({
                members: [senderId, receiverId],
                messages: [] // Initialize messages array if it doesn't exist
            });
        }

        // Create a new message document
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // Push the new message's ID to the conversation's messages array
        conversation.messages.push(newMessage._id);

        // Save both the new message and updated conversation to the database
        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } 
        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error occurred while sending message" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params; // conversation ID from route parameters
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] }
        }).populate("messages");
        if (!conversation) {
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error occurred while sending message" });
    }
}