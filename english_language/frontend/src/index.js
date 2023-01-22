import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Create from './pages/Create.jsx';
import Index from './pages/Index.jsx';
import NavBar from './components/NavBar.jsx';

const container = document.getElementById('index');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <><NavBar/><Index/></>,
  },
  {
    path: "/create/word",
    element: <><NavBar/><Create/></>,
  },
]);
  
root.render(<RouterProvider router={router} />);