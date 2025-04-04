import Todo from "./components/todo";
import "./index.css"
import Input from "./components/input";

function App() {

  return (
    <div className="bg-blue-100 text-gray-800 min-h-screen flex items-center justify-center">
      <div className="min-h-screenflex items-center justify-center bg-custom-gradient">
        <div className="grid grid-cols-1 w-96">
          <div className=" bg-transparent shadow-xl shadow-black  overflow-hidden">
            <div className="p-4">
              <Todo />
              <Input />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
