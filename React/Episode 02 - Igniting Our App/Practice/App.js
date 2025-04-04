import React from 'react';
import ReactDOM from 'react-dom/client';

// const heading =React.createElement('h1',{id:"heading"},"Hello world from React");
// const root = ReactDOM.createRoot(document.getElementById('root'));
// // console.log(heading);
// root.render(heading);




// creating child div
// const parent = React.createElement(
//     'div',{id:'parent'},
//     React.createElement('div',{id:'child'},React.createElement('h1',{},"I am an h1 tag"))
// )
// React Element is normal JavaScript Object{}




//creating sibling using the third arguments as array
// const parent = React.createElement(
//     'div',{id:'parent'},
//     React.createElement('div',{id:'child'},[React.createElement('h1',{},"I am an h1 tag"),React.createElement('h1',{},"I am an h1 tag")])
// )


const parent = React.createElement(
    'div',{id:'parent'},
    [React.createElement('div',{id:'child1'},[React.createElement('h1',{},"I am an h1 tag"),React.createElement('h2',{},"I am an h2 tag")])],
    [React.createElement('div',{id:'child2'},[React.createElement('h1',{},"I am an h1 tag"),React.createElement('h2',{},"I am an h2 tag")])]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(heading);
root.render(parent);
