import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Axios from "axios"
import React, { useEffect, useState } from "react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
]);

function App() {
  

  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
        
      </div>
    </div>
  );
}

export default App;
