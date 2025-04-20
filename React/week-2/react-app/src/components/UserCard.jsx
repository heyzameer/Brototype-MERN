import React, { useEffect, useState } from 'react';
import './User.css'; 

const Usercard = () => {
  const [count, setCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "Loading...",
    location: "Loading...",
    avatar_url: ""
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/heyzameer');
        const json = await response.json();
        setUserInfo({
          name: json.name,
          location: json.location,
          avatar_url: json.avatar_url,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-card">
      <img src={userInfo.avatar_url} alt="Avatar" />
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
      <button onClick={() => setCount(count - 1)}>Decrease Count</button>
      <h2>{userInfo.name}</h2>
      <h3>Location: {userInfo.location}</h3>
      <h4>Contact: @zameerK</h4>
    </div>
  );
};

export default Usercard;
