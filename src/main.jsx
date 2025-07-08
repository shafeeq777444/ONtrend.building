import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClearAllCacheButton } from "./components/common/ClearAllCacheButton.jsx";
import "@/utils/118n";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ReactQueryDevtools initialIsOpen={false} />
                {/* <ClearAllCacheButton/> */}

                <Toaster
                    position="bottom-right"
                    toastOptions={{
                        style: {
                            // background: "#ff3131",  // red background
                            color: "#ffffff", // white text
                        },
                        success: {
                            style: {
                                background: "#ff3131",
                                color: "#ffffff", // example for success
                            },
                        },
                        error: {
                            style: {
                                // background: "#ff3131",
                                color: "#ff3131",
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
