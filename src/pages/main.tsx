import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/main.scss";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClientProvider, QueryClient } from "react-query";
import AppLayout from "../layouts/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>,
  document.getElementById("root")
);
