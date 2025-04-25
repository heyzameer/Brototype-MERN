import { useRef,useState } from 'react';

const UncontrolledInput = () => {
  const inputRef = useRef();
  const inputRef2 = useRef();
  const [value, setValue] = useState(""); 
  const [value2, setValue2] = useState(""); 

  const handleShowValue = () => {
    // alert("Uncontrolled: " + inputRef.current.value);
    console.log(inputRef);
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "yellow";
    inputRef2.current.style.backgroundColor = "";
    setValue(inputRef.current.value);

  };
  const handleShowValue2 = () => {
    // alert("Uncontrolled: " + inputRef.current.value);
    console.log(inputRef);
    inputRef2.current.focus();
    inputRef2.current.style.backgroundColor = "yellow";
    inputRef.current.style.backgroundColor = "";
    setValue2(inputRef.current.value);

  };

  return (
    <div>
      <input type="text" ref={inputRef} /> {/* 🧠 Value is stored in DOM */}
      <button onClick={handleShowValue}>Show Value</button>
      <input type="text" ref={inputRef2} /> {/* 🧠 Value is stored in DOM */}
      <button onClick={handleShowValue2}>Show Value</button>
      <p>{value}</p>
      <p>{value2}</p>
    </div>
  );
};
 
export default UncontrolledInput;