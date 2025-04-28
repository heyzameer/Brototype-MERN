import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, reset } from './features/timer/timerSlice';

const Timer = () => {
    const [isRunning, setRunning] = useState(false);
    const dispatch = useDispatch();
    const count = useSelector((state) => state.timer.value)
    const [direction,setDir] = useState('up');

    // useEffect(() => {
    //     let interval;

    //     if (isRunning) {
    //         interval = setInterval(() => {
    //             if(direction=='up'){
    //                 if(count>=10){
    //                     setDir('down')
    //                     dispatch(decrement());
    //                 }else{
    //                     dispatch(increment());
    //                     // console.log("hello");
    //                 }
    //             }else if(direction=='down'){
    //                 if(count<=0){
    //                     setDir('up')
    //                     dispatch(increment());
    //                 }else{
    //                     dispatch(decrement());
    //                 }
    //             }
                
    //         }, 1000);
    //     }

    //     return () => { console.log("cleared"); clearInterval(interval); } // Cleanup
    // }, [isRunning, count, direction, dispatch]);

    useEffect(()=>{
        let interval;
        if(isRunning){
            interval = setInterval(()=>{
                dispatch(increment());
            },1000)
        }
        return () => { console.log("cleared"); clearInterval(interval);}
    },[isRunning])

    const handleReset = () => {
        dispatch(reset());
    }
    return (

        <div className='container'>
            <button onClick={() => setRunning(true)}>start</button>
            <p>Count:{count}</p>
            <button onClick={() => setRunning(false)}>stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>

    )
}

export default Timer
