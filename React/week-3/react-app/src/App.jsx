import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Account';
import Shop from './components/Shop';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container m-5">
        {/* Flex row with two boxes */}
        <div className="d-flex justify-content-between gap-3">


          {/* Box 2 */}
          <div className="flex-fill p-4 bg-secondary rounded text-white">
            <Shop />
          </div>
          {/* Box 1 */}
          <div className="flex-fill p-4 bg-primary rounded text-white">
            <Navbar />
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
