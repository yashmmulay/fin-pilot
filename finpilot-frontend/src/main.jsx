import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import "./index.css";
import App from "./App.jsx";
import AppStatusHandler from "./components/system/AppStatusHandler";

createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <AppStatusHandler>

                    <App />

                </AppStatusHandler>

                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 3000,
                    }}
                />

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);