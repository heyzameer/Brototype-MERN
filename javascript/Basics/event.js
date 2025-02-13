// ### **Event Delegation**

// Event delegation is a technique in JavaScript where you attach a single event listener to a parent element instead of multiple event listeners to individual child elements. This approach makes your code more efficient, especially when dealing with dynamically added elements.

// In event delegation, the event listener is added to a parent element, and it listens for events that occur on any of its child elements. The event "bubbles up" from the target element to the parent.

// #### Example:

// ```html
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

// <script>
//   document.getElementById("list").addEventListener("click", function(event) {
//     if (event.target.tagName === "LI") {
//       alert("You clicked on: " + event.target.textContent);
//     }
//   });
// </script>
// ```

// In this example, the `click` event is delegated to the `ul` element, and when any `li` is clicked, it alerts the text content. Even if you add more `li` items dynamically, the parent `ul` will still handle the event.

// ### **Event Propagation**

// Event propagation refers to the flow of an event through the DOM tree. When an event is triggered, it travels from the target element to the root of the document. There are two phases of event propagation:

// 1. **Bubbling Phase** (default): The event starts from the target element and bubbles up to the root of the DOM tree.
// 2. **Capturing Phase** (optional): The event starts from the root and propagates down to the target element.

// In modern JavaScript, the **bubbling phase** is the default. However, you can use the `capture` flag to control whether the event should be captured during the capturing phase.

// ### **Event Bubbling**

// Event bubbling occurs when an event triggered on an element bubbles up through its ancestors in the DOM tree. The event starts from the innermost element (the target) and propagates up to the outer elements.

// #### Example:

// ```html
// <div id="outer">
//   <button id="inner">Click Me</button>
// </div>

// <script>
//   document.getElementById("outer").addEventListener("click", function() {
//     alert("Outer Div clicked!");
//   });

//   document.getElementById("inner").addEventListener("click", function() {
//     alert("Button clicked!");
//   });
// </script>
// ```

// In this case, when you click on the button, both `alert("Button clicked!")` and `alert("Outer Div clicked!")` will be triggered. This is because the event bubbles up from the button to the `div`.

// You can stop the event from bubbling by using `event.stopPropagation()`:

// ```javascript
// document.getElementById("inner").addEventListener("click", function(event) {
//   alert("Button clicked!");
//   event.stopPropagation(); // Stops the event from bubbling to the parent
// });
// ```

// ### **Event Capturing**

// Event capturing (also known as "trickling") occurs when the event is captured before reaching the target element. The event starts from the root of the DOM tree and propagates down to the target element.

// By default, events are handled in the **bubbling** phase, but you can use the `capture` option to specify that the event listener should be triggered during the capturing phase.

// #### Example:

// ```html
// <div id="outer">
//   <button id="inner">Click Me</button>
// </div>

// <script>
//   document.getElementById("outer").addEventListener("click", function() {
//     alert("Outer Div clicked!");
//   }, true); // true indicates capturing phase

//   document.getElementById("inner").addEventListener("click", function() {
//     alert("Button clicked!");
//   });
// </script>
// ```

// In this example, the outer `div`'s click event will be triggered **first** (during the capturing phase) before the button's click event.

// To summarize:

// - **Event Delegation**: A technique where a parent element listens for events on its child elements, often used to handle dynamically added elements.
// - **Event Bubbling**: The event propagates from the target element to the root of the document.
// - **Event Capturing**: The event propagates from the root of the document down to the target element.
// - **Event Propagation**: The overall flow of an event through the DOM, which includes both bubbling and capturing phases.