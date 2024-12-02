import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@/router/BrowserRouter";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster"
import { Provider } from "react-redux";
import { store } from "@/redux/store";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <Toaster/>
  </QueryClientProvider>
  </Provider>
);
