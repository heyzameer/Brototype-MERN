import { useEffect, useState } from 'react';

const User = () => {
  const [count, setCount] = useState(0);  // For count state
  const [userInfo, setUserInfo] = useState({ name: "Loading...", location: "Loading...", avatar_url: "" });

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

    fetchUserData();  // Fetch user data when the component mounts
  }, []);  // Empty dependency array to run the effect only once on mount

  return (
    <div className="user-card">
      <img src={userInfo.avatar_url} alt="Avatar" width="150" style={{ borderRadius: "10px" }} />
      <h1>Count: {count}</h1>
      <button
        onClick={() => setCount(count + 1)}  // Increase count on button click
      >
        Increase Count
      </button>
      <h2>{userInfo.name}</h2>
      <h3>Location: {userInfo.location}</h3>
      <h4>Contact: @zameerK</h4>
    </div>
  );
};

export default User;
