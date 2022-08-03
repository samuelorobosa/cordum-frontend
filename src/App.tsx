import React from 'react';
import './App.scss';
import Register from "./components/Authentication/Register";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Overview from "./components/Overview";
import PrivateRoute from "./router/PrivateRoute";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() :JSX.Element|null {
  return (
      <>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<PrivateRoute/>} >
                        <Route path="/" element={<Overview/>} />
                    </Route>
              </Routes>
             </BrowserRouter>
          </QueryClientProvider>
      </>
  );
}

export default App;
