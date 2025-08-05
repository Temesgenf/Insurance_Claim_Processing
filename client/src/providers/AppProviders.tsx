import React, { memo } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../Context/ThemeContext";
import { AuthProvider } from "../Context/AuthContext";
import { SidebarProvider } from "../Context/SidebarContext";
import { SocketProvider } from "../Context/SocketContext";
import { NotificationProvider } from "../Context/NotificationContext";
import { HelmetProvider } from "react-helmet-async";

interface AppProvidersProps {
  children: React.ReactNode;
}

// Memoize providers to prevent unnecessary re-renders
const MemoizedThemeProvider = memo(ThemeProvider);
const MemoizedAuthProvider = memo(AuthProvider);
const MemoizedSocketProvider = memo(SocketProvider);
const MemoizedNotificationProvider = memo(NotificationProvider);
const MemoizedSidebarProvider = memo(SidebarProvider);

export const AppProviders: React.FC<AppProvidersProps> = memo(({ children }) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MemoizedThemeProvider>
          <MemoizedAuthProvider>
            <MemoizedSocketProvider>
              <MemoizedNotificationProvider>
                <MemoizedSidebarProvider>
                  {children}
                </MemoizedSidebarProvider>
              </MemoizedNotificationProvider>
            </MemoizedSocketProvider>
          </MemoizedAuthProvider>
        </MemoizedThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
});

AppProviders.displayName = "AppProviders";
