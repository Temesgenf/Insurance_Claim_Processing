import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./Context/SidebarContext.tsx";
import { ThemeProvider } from "./Context/ThemeContext.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <StrictMode>
            <App />
          </StrictMode>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </ThemeProvider>
);
