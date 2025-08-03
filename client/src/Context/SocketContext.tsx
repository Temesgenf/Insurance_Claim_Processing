import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext<Socket | null>(null);

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL || "http://localhost:3000";
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!user || initialized.current) return;
    const newSocket = io(API_BASE_URL, {
      auth: { userId: user.userId },
    });

    setSocket(newSocket);
    initialized.current = true;

    return () => {
      newSocket.disconnect();
      initialized.current = false;
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};