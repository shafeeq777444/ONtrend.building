import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClearAllCacheButton } from "./shared/components/common/ClearAllCacheButton.jsx";
import "@/lib/i18n-language/118n";
import { store } from "./shared/app/store";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ReactQueryDevtools initialIsOpen={false} />
                {/* <ClearAllCacheButton/> */}
                <Toaster
                    position="bottom-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: "rgba(30, 30, 30, 0.6)", // semi-transparent dark gray
                            color: "#f1f1f1", // soft white text
                            borderRadius: "12px",
                            padding: "12px 16px",
                            fontSize: "14px",
                            backdropFilter: "blur(10px)", // glass effect
                            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)", // softer shadow
                        },
                        success: {
                            iconTheme: {
                                primary: "#ffffff",
                                secondary: "#1f1f1f", // match background contrast
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ffffff",
                                secondary: "#1f1f1f",
                            },
                        },
                    }}
                />
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    </StrictMode>
);
