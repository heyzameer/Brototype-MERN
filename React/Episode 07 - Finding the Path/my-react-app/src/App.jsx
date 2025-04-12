import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import "./App.css";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet /> {/* This is where the nested route components will render */}
      <Footer />
    </div>
  );
};

export default AppLayout;