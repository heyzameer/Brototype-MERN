import React, { useEffect, useRef, useState } from 'react'

const UserRef = () => {
    // let [number,setNumber] = useState(0);
    const ref = useRef(0);


    useEffect(()=>{
        console.log("component render")
    })
    function handleClick(){
        ref.current++;
        console.log(ref.current);
    }
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default UserRef
