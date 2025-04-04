import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.js'; // Import Header component

const App = () => {
  return (
    <div> {/* The JSX must have a single root element */}
      <Header />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
