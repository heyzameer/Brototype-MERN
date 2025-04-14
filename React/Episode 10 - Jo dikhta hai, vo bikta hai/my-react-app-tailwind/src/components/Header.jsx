import { LOGO_URL } from '../utils/constants';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Header = () => {
  //   let btnName = 'Login';

  const [btnNameReact, setBtnNameReact] = useState('Login');
  const onlineStatus = useOnlineStatus();
  console.log('header render');

  return (
    <div className="m-1 flex flex-wrap justify-between items-center px-4 py-2 shadow-[0_2.4rem_4.8rem_rgba(0,0,0,0.075)] rounded-[11px] bg-white">
      {/* Logo Section */}
      <div className="cursor-pointer">
        <img src={LOGO_URL} alt="App Logo" className="w-[70px]" />
      </div>
  
      {/* Navigation Items */}
      <div>
        <ul className="flex items-center gap-4 text-[18px] list-none">
          <li className="px-2 py-1">
            Online Status: {onlineStatus ? "✅" : "🔴"}
          </li>
          <li className="px-2 py-1">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 py-1">
            <a href="/about">About Us</a>
          </li>
          <li className="px-2 py-1">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-2 py-1">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-2 py-1">Cart</li>
          <li>
  <button
    className={`ml-2 text-white font-semibold px-4 py-2 rounded-lg transition-all ${
      btnNameReact === "Login"
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-yellow-400 hover:bg-yellow-500"
    }`}
    onClick={() => {
      setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login");
      console.log(btnNameReact);
    }}
  >
    {btnNameReact}
  </button>
</li>

        </ul>
      </div>
    </div>
  );
  
};

export default Header;
