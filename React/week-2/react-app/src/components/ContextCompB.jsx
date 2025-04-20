import React from 'react'
import ContextCompC from './ContextCompC'

const ContextCompB = () => {
  return (
    <div style={{border:"3px solid",padding:"22px"}}>
      <h1>Component B</h1>
      <ContextCompC/>
    </div>
  )
}

export default ContextCompB
