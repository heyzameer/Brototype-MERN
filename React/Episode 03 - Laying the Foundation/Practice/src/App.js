import React from "react";
import ReactDOM from "react-dom/client";


// react element = object
const heading = React.createElement("h1", { id: "heading" }, "Hello world");

// const root = ReactDOM.createRoot(document.getElementById("root"));

//replace evrything on the root
// root.render(heading);

//cleaner code using jsx
// parcel - babel converting jsx to react code
//jsx -> react.createelement -> react element -> html then renders
//react element inside react element

// multiline using ()
const myElement = (<div>{heading}<h1 id="heading" className="headingss">I Love JSX!
</h1></div>);

const Title = () => (
  <h1 id="heading" className="headingss">
    I Love JSX!
  </h1>
);

// functional component
// if a function is returning jsx is called functional component
// const HeadingComponent = ()=>{
//     return <h1>Welcom to React Components</h1>
// }

//component compositions
//adding component inside component
//inside {} we can write js
const num = 1000;
const HeadingComponent2 = () => (
  <div>
    <h1>Welcom to React Components</h1>
    <Title />
    {Title()}
    <Title></Title>
    <h2>{num}</h2>
    {/* if data cominfg from api it sanitize it */}
    {console.log(num)}
    {/* adding react element inside component */}
    {heading}
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
//rendering react element
// root.render(myElement);

// renderingfunctional copmponent
root.render(<HeadingComponent2 />);
