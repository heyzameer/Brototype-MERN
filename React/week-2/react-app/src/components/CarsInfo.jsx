import React, { useState } from 'react'

const CarsInfo = () => {
    const [cars, setCars] = useState([])
    const [carYear, setCaryear] = useState(new Date().getFullYear());
    const [carMake, setCarMake] = useState("");
    const [carModel, setCarModel] = useState("");

    function handleAdd(){
        const newCar = { year: carYear, make: carMake,model:carModel};

        if(carMake===""||carModel==="") return;
        // newCar.sort((a,b)=>a.year -b.year);
        setCars(c=>[...c,newCar].sort((a,b)=>a.year -b.year));
        setCarMake("")
        setCarModel("");
        setCaryear(new Date().getFullYear())
    }
  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin:"10px", gap:"10px"}}>
    <h1>List Of Car Objects</h1>
    <input type="text" value={carMake} onChange={(e)=>setCarMake(e.target.value)} placeholder='Enter Car Maker'/>
    <input type="text" value={carModel} onChange={(e)=>setCarModel(e.target.value)} placeholder='Enter Car Model'/>
    <input type='number' value={carYear} onChange={(e)=>setCaryear(e.target.value)} placeholder='Enter Car Year'/>
    <button onClick={handleAdd}>Add Car</button>
    <ul>
        {cars.map((car, index) => (
            <li key={index}>
                <p>Year: {car.year}</p>
                <p>Make: {car.make}</p>
                <p>Model: {car.model}</p>
                </li>))}
                </ul>
    </div>
  )
}

export default CarsInfo
