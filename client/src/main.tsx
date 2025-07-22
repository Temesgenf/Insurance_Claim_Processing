import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { SidebarProvider } from "./Context/SidebarContext.tsx";
import { SocketProvider } from "./Context/SocketContext.tsx";
import { NotificationProvider } from "./Context/NotificationContext.tsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SocketProvider>
              <NotificationProvider>
                <SidebarProvider>
                  <App />
                </SidebarProvider>
              </NotificationProvider>
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
