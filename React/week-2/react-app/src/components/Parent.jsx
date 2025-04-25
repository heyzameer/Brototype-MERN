import { useState, useCallback, memo } from 'react';

const Child = memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const memoizedClickHandler = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // ✅ No need for `count` here

  return (
    <div>
      <h1>Count: {count}</h1>
      <Child onClick={memoizedClickHandler} />
    </div>
  );
};

export default Parent;
