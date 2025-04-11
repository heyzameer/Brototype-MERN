import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { StrictMode } from 'react'



import About from './components/About';
import Contact from './components/Contact';
import AppLayout from './App';
import Error from './components/Error';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error/>
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact /> 
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <StrictMode><RouterProvider router={appRouter} /></StrictMode>);


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
