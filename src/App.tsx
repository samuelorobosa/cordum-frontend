import React from 'react';
import './App.scss';
import Register from "./components/Authentication/Register";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Overview from "./components/Overview";

function App() :JSX.Element|null {
  return (
      <>
          <BrowserRouter>
              <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/" element={<Overview/>} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;
