import React from 'react'
// import Usercard from './components/UserCard'
// import GreetingConditional from './components/GreetingConditional'
// import ListUser from './components/ListUser'
// import Counter from './components/Counter'
// import TextDisplay from './components/TextDsiplay'
// import UncontrolledInput from './components/UncontrolledInput'
// import FormExample from './components/FormExample'
// import ColorPicker from './components/ColorPicker'
// import CarInfo from './components/CarInfo'
// import FoodInfo from './components/FoodInfo'
// import CarsInfo from './components/CarsInfo'
// import TodoList from './components/TodoList'
// import DigitalClock from './components/DigitalClock'
// import ContextCompA from './components/ContextCompA'
// import UserRef from './components/UserRef'
// import StopWatch from './components/StopWatch'
// import SimpleStopwatch from './components/SimpleStopwatch'
// import Parent from './components/Parent'
import { lazy } from 'react'
import { Suspense } from 'react'
import UseReduceComponent from './components/UseReduceComponent'

const LazyComponent = lazy(()=>import('./components/LazyComponnt'))
const App = () => {
  return (
    <div>

      <UseReduceComponent/>
      {/* <Suspense fallback={<div>Loading....</div>}>
        <LazyComponent/>
      </Suspense> */}
      {/* <Parent/> */}
      {/* <SimpleStopwatch/> */}
      {/* <StopWatch/> */}
      {/* <UserRef/> */}
      {/* <ContextCompA/> */}
      {/* <DigitalClock/> */}
      {/* <TodoList/> */}
      {/* <CarsInfo/> */}
      {/* <FoodInfo/> */}
      {/* <CarInfo/> */}
      {/* <ColorPicker/> */}
      {/* <FormExample/> */}
      {/* <UncontrolledInput/> */}
      {/* <TextDisplay/> */}
    {/* <Counter/> */}``

      {/* <ListUser/> */}
      {/* <GreetingConditional data= {{isLogedIn:true,user:"zameer"}}/>
   <Usercard/> */}
    </div>
  )
}

export default App
