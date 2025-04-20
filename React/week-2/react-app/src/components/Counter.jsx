import React, { useEffect, useState } from 'react'

function counter() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let intervalId = null;
        if (isRunning) {
            intervalId = setInterval(() => {
                setCount(prevCount => prevCount + 1);
            }, 1000);
        }
        return () => {
            clearInterval(intervalId);
        }

    });

    return (
        // <div>
        //   <p>Count is: {count}</p>
        //   <button onClick={() => setCount(count + 1)}>Increment</button>
        //   <button onClick={() => setCount(count - 1)}>Decrement</button>
        // </div>


        <>
            <p>Count is: {count}</p>
            <button onClick={() => setIsRunning(true)}>Start</button>
            <button onClick={() => setIsRunning(false)}>stop</button>
            <button onClick={() => setCount(0)}>reset</button>
        </>
    )
}

export default counter
