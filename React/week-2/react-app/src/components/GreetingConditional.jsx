import React from 'react';

const GreetingConditional = (props) => {
  const { isLogedIn, user } = props.data;

  return (
    <div>
      {isLogedIn ? <h1>Welcome {user}</h1> : <h1>Welcome Guest</h1>}
    </div>
  );
};

export default GreetingConditional;
