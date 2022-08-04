import React from 'react';
import './App.scss';
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() :JSX.Element|null {
  return (
      <>
              <ToastContainer limit={1} position={'top-center'}/>
              <QueryClientProvider client={queryClient}>
                  <BrowserRouter>
                      <AppRouter/>
                 </BrowserRouter>
                  <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
      </>
  );
}

export default App;
