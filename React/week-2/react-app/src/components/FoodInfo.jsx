import React, { useState } from 'react'

// update ARRAYS in state
const FoodInfo = () => {
    const [inputVal,setInputVal] = useState('');
    const [food, setFood] = useState([])

    const handleSort = () => {
        setFood(prev => [...prev].sort());  // ✅ sorted alphabetically
      };

    const handleAdd = () =>{
        setFood(prevFood=>[...prevFood,inputVal])
        setInputVal('');
    }
  return (
    <div>
      <h1>List Of Food</h1>
      <input type='text' placeholder='Enter Food Name' value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleSort}>Sort</button>
    <ul>
        {food.map((item,index)=>{
            return <li key={index}>{item}</li>
        })}
    </ul>
    </div>
  )
}

export default FoodInfo
