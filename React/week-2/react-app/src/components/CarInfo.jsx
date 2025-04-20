import React from 'react'
import { useState } from 'react';
// update OBJECTS in state 
function CarInfo() {
    const [car, setCar] = useState({ year: 2024, 
                                     make: "Ford", 
                                     model: "mustang" })
    function handleYearChange(e){
        setCar({...car,year:Number(e.target.value)})
    }
    function handleMakeChange(e){
        setCar({...car,make:e.target.value})
    }
    function handleModelChange(e){
        setCar({...car,model:e.target.value})
    }
    return (
        <div style={{display:"flex",flexDirection:"column", alignItems: "center",gap:"10px", textAlign:"center"}}>
            <h1>Car Info</h1>
            <p>My Favorite Car is : {car.year} {car.make} {car.model}</p>
            <input style={{ width: '200px', padding: '8px' }} type='number' value={car.year} onChange={handleYearChange}/>
            <input style={{ width: '200px', padding: '8px' }} type='text' value={car.make} onChange={handleMakeChange}/>
            <input style={{ width: '200px', padding: '8px' }} type='text' value={car.model} onChange={handleModelChange}/>
        </div>
    )
}

export default CarInfo
