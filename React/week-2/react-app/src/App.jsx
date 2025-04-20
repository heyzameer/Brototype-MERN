import React from 'react'
import Usercard from './components/UserCard'
import GreetingConditional from './components/GreetingConditional'
import ListUser from './components/ListUser'
const App = () => {
  return (
    <div>
      <ListUser/>
      {/* <GreetingConditional data= {{isLogedIn:true,user:"zameer"}}/>
   <Usercard/> */}
    </div>
  )
}

export default App
