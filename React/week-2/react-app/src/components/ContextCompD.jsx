import React,{useContext} from 'react'
import { CountContext } from './ContextCompA'
import ContextCompB from './ContextCompB'

const ContextCompD = () => {
  const count = useContext(CountContext);
  return (
    <div style={{border:"3px solid",padding:"22px"}}>
      <h1>Component D</h1>
      <p>Count is {count}</p>
    </div>
  )
}

export default ContextCompD