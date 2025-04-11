import React from 'react';


import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer'
import "./App.css"

// AppLayout with Header, Body, and Footer
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};


export default AppLayout;