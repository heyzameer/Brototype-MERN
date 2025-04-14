import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { StrictMode } from 'react';

import About from './components/About';
import Contact from './components/Contact';
import AppLayout from './App';
import Body from './components/Body';
import Error from './components/Error';
import RestaurantMenu from './components/RestuarantMenu'
import Shimmer from './components/Shimmer';


// import Grocery from './components/Grocery';
//lazy loading or on demand loadig
// grocery has new js file
//suspense avaoid the erorr we need wrap inisde wrap
const Grocery = lazy(()=> import('./components/Grocery'))

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '', // default route
        element: <Body />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'grocery',
        element: <Suspense fallback={<Shimmer/>}><Grocery /></Suspense>
      },
      {
        path:"/restuarants/:resId",
        element:<RestaurantMenu/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
