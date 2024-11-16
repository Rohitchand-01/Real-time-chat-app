import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://localhost:3000", {
        query: { userId: authUser.user._id },
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUser", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socketInstance) {
          socketInstance.close();
        }
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
