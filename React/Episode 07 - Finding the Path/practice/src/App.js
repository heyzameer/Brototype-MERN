// index.js or main.jsx

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import {
//   createBrowserRouter,
//   RouterProvider
// } from 'react-router-dom';

// import Header from './components/Header';
// import Body from './components/Body';
// import About from './components/About';

// // Footer Component
// const currYear = new Date().getFullYear();
// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>
//         Copyright &copy; {currYear}, Made with 💗 by <strong>Zameer</strong>
//       </p>
//     </footer>
//   );
// };

// // AppLayout with Header, Body, and Footer
// const AppLayout = () => {
//   return (
//     <div className="app">
//       <Header />
//       <Body />
//       <Footer />
//     </div>
//   );
// };

// // React Router Configuration
// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout />
//   },
//   {
//     path: '/about',
//     element: <About />
//   },
//   {
//     path: '/contact',
//     element: <About /> // Replace with <Contact /> if you have a Contact component
//   }
// ]);

// // Mount the App
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<RouterProvider router={appRouter} />);
