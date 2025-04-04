import { useState } from "react"
import List from "./list";

export default function Input() {
    const [todo, setTodo] = useState({name:"",done:false});
    const [item, setItem] = useState([]);

    const handelChange = (e) => {
        setTodo({name:e.target.value,done:false})
    }
    const submit = (e) => {
        e.preventDefault();
        setItem([...item, todo])
        setTodo({name:"",done:false})

    }

    return (
        <>
            <form className="flex flex-row gap-3">
                <input className=" mt-4 focus:ring-2 focus:ring-indigo-500/40 focus:outline-none w-full  text-slate-700 placeholder-slate-950  py-2 pl-3 ring-1 ring-slate-300 shadow-lg shadow-indigo-500/40 " type="text" onChange={(e) => handelChange(e)} value={todo.name} />
                <button className="basis-1/4 mt-4 w-full bg-transparent border-l-violet-50 text-white py-2 px-4  hover:backdrop-brightness-90 btn btn--primary shadow-lg shadow-indigo-500/40 border border-indigo" onClick={(e) => submit(e)}>Add</button>
            </form>
            <ul className="flex flex-col w-95  gap-3  mt-3 ">
                <List items={item} setItem={setItem} />
            </ul>
        </>
    )
}