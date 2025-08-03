import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
// import { useAuth } from './AuthContext'; // adjust import path as needed

interface Notification {
  type: string;
  message: string;
  data?: any;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  clearNotifications: () => void;
  connectionError: boolean;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  clearNotifications: () => {},
  connectionError: false
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [connectionError, setConnectionError] = useState(false);
  const socket = useSocket();
  // const { user } = useAuth(); // get user from auth context

  // useEffect(() => {
  //   if (user) {
  //     setNotifications(prev => [
  //       {
  //         type: 'info',
  //         message: `Welcome back, ${user.fullName || 'User'}! You are logged in.`,
  //         timestamp: new Date()
  //       },
  //       ...prev
  //     ]);
  //   }
  // }, [user]);
  
  useEffect(() => {
    if (!socket) {
      setConnectionError(true);
      return;
    }

    setConnectionError(false);

    // Listen for notifications from the server
    socket.on('notification', (notification: Omit<Notification, 'timestamp'>) => {
      const newNotification = {
        ...notification,
        timestamp: new Date()
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      console.log(notification)
    });

    return () => {
      socket.off('notification');
    };
  }, [socket]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, clearNotifications, connectionError }}>
      {children}
    </NotificationContext.Provider>
  );
};