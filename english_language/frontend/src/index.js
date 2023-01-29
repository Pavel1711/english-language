import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { navigation } from './constants/nav.js';

const container = document.getElementById('index');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter(navigation);
  
root.render(<RouterProvider router={router} />);