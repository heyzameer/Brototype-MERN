// The events module IS A BUILT IN MODULE allows us to work with events in Node.js
// An event is an action or an occurrence that has happened in our application that we can respond to
// Using the events module, we can dispatch our own custom events and respond to those custom events in a non-blocking manner


// event module return cls called event Emitter
const EventEmitter = require('events'); // Import the events module



const emitter = new EventEmitter(); // Create a new instance of the EventEmitter class

// evnt name is order-pizza
// call back funvrionm
emitter.on("order-pizza", function (size,topping) { //  Register an event listener for the "order-pizza" event
    console.log(`Order received! Baking a ${size} pizza with ${topping} topping.`); // Log a message when the event is emitted
})

emitter.on("order-pizza", function (size) { //  Register an event listener for the "order-pizza" event
    if(size==='large'){
        console.log(`Order received! Baking a ${size} pizza with extra cheese.`); //
    }
    })


console.log("Do work before event occurs in the program."); // Log a message before emitting the event

emitter.emit("order-pizza", "large", "pepperoni");


// EVENT ALLOW US TO WRITE CODE THAT IS NON BLOCKING AND ASYNCHRONOUS 