import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { app, server } from './SocketIO/server.js';



dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin : 'http://localhost:3001',
    credentials: true  // Allows cookies and credentials to be sent

  }
));

const PORT = process.env.PORT || 4002;
const URI = process.env.MONGODB_URI;


try {
  mongoose.connect(URI)
  console.log("connected to MongoDB");
} catch (error) {
  console.log(error);
}

app.use('/user', userRoute);
app.use('/message', messageRoute);

app.get('/health', (req,res)=>{
  res.send('healthy')
})

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})