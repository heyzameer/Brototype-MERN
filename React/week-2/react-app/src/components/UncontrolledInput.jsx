import { useRef } from 'react';

const UncontrolledInput = () => {
  const inputRef = useRef();
  const inputRef2 = useRef();

  const handleShowValue = () => {
    // alert("Uncontrolled: " + inputRef.current.value);
    console.log(inputRef);
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "yellow";
    inputRef2.current.style.backgroundColor = "";

  };
  const handleShowValue2 = () => {
    // alert("Uncontrolled: " + inputRef.current.value);
    console.log(inputRef);
    inputRef2.current.focus();
    inputRef2.current.style.backgroundColor = "yellow";
    inputRef.current.style.backgroundColor = "";

  };

  return (
    <div>
      <input type="text" ref={inputRef} /> {/* 🧠 Value is stored in DOM */}
      <button onClick={handleShowValue}>Show Value</button>
      <input type="text" ref={inputRef2} /> {/* 🧠 Value is stored in DOM */}
      <button onClick={handleShowValue2}>Show Value</button>
    </div>
  );
};
 
export default UncontrolledInput;