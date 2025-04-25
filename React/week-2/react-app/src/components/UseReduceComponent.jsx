import React, { useReducer } from 'react';

function countReducer(state, action) {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 };
    default:
      throw new Error('Unknown action type');
  }
}

const UseReduceComponent = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });
  console.log("rerender")

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INC' })}>Increment</button>
    </div>
  );
};

export default UseReduceComponent;
