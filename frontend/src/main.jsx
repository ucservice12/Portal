import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProviderWrapper } from "@/context/ContextProviderWrapper";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="default" storageKey="cognitoThems">
      <BrowserRouter>
        <ContextProviderWrapper>
          <App />
        </ContextProviderWrapper>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
