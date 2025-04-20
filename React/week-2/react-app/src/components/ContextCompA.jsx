import React,{useState,createContext} from 'react'
import ContextCompB from './ContextCompB'
// useContext - React allow you to share values beyween multiple levels of components without passing props throught each level

export const CountContext = createContext() // create a context

const ContextCompA = () => {
    const [count, setCount] = useState(0)
  return (
    <div style={{border:"3px solid",padding:"22px"}}>
      <h1>Component A</h1>
      <CountContext.Provider value={count}>
      <ContextCompB />
      </CountContext.Provider>
      
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default ContextCompA


// import createContext
// export count context
// warap with provider component pass value
// setup a consumer
// import usecontext from react
// import the exported contexrt

// any coponent which is child component of provioder component has acces to the state