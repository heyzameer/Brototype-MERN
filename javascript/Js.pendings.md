✅❌
**JavaScript Interview Questions:**

1.  **Pure functions:**
    *   *What is a pure function?  Give an example of a pure function and an impure function.*
    *   *Why are pure functions desirable in programming?*
    *   *How do pure functions relate to concepts like idempotency and referential transparency?*

2.  **Finally block syntax:**
    *   *What is the purpose of the `finally` block in a `try...catch...finally` statement?*
    *   *Will the `finally` block *always* execute?  Give examples of scenarios where it might not.*
    *   *Can a `finally` block override the return value of a `try` or `catch` block?*

3.  **Error objects:**
    *   *What are the built-in error types in JavaScript (e.g., `TypeError`, `ReferenceError`)? Give examples of when each might occur.*
    *   *How can you create custom error objects in JavaScript?*
    *   *How can you access the error message and stack trace from an error object?*

4.  **`instanceof` operator:**
    *   *What does the `instanceof` operator do?  Provide an example.*
    *   *How does `instanceof` work with inheritance?*
    *   *What are the limitations of `instanceof`?  When might you use `typeof` instead (or in addition)?*

5.  **Bind concept (`.bind()`, call, apply, bind - consolidated):**
    *   *Explain the difference between `call`, `apply`, and `bind`.*
    *   *Write a code example demonstrating the use of each of `call`, `apply`, and `bind`.*
    *   *What is the purpose of `bind`?  When would you use it?*
    *   *How can you use `bind` to create a partially applied function?*

6.  **New keyword:**
    *   *What four things happen when you use the `new` keyword with a constructor function?*
    *   *Explain the role of `this` in a constructor function called with `new`.*
    *   *What happens if a constructor function explicitly returns a non-primitive value?  What about a primitive value?*

7.  **Async-await:**
    *   *What is the purpose of `async` and `await`?  How do they relate to Promises?*
    *   *How does error handling work with `async/await`?*
    *   *Write a code example that uses `async/await` to fetch data from a (mock) API.*
    *   *What are the advantages of `async/await` over using Promises directly with `.then()` and `.catch()`?*

8.  **Rest operator:**
    *   *How does the rest operator (`...`) work in function parameters?  Provide an example.*
    *   *How can you use the rest operator to collect multiple arguments into an array?*
    *   *What is the difference between the rest operator and the arguments object?*

9.  **Inheritance in JS:**
    *   *Explain prototypal inheritance in JavaScript.*
    *   *How can you create a "class" and "subclass" relationship in JavaScript (using both ES5 and ES6 syntax)?*
    *   *What is the prototype chain?  How does it work?*
    *   *What is the difference between `Object.create` and using the `new` keyword for inheritance?*

10. **IIFE (Immediately Invoked Function Expression) syntax and benefits:**
    *   *What is an IIFE?  Write an example of one.*
    *   *What are the benefits of using IIFEs? (e.g., avoiding global scope pollution, creating private scope)*
    *   *How can you pass arguments to an IIFE?*

11. **Illegal shadowing:**
    *   *What is variable shadowing? Is it always bad*
    *  *Explain illegal shadowing with example*

12. **Generator function (examples, applications):**
    *   *What is a generator function?  How is it different from a regular function?*
    *   *How do you create a generator function? (using `function*`)?*
    *   *Explain the use of the `yield` keyword in a generator.*
    *   *What are some practical applications of generator functions? (e.g., iterating over large datasets, implementing custom iterators)*

13. **Constructor functions (and comparison with `Object.create`):**
    *   *What is a constructor function?  How is it used to create objects?*
    *   *Explain the difference between creating an object with a constructor function (using `new`) and using `Object.create()`.*
    *  *Explain prototype in terms of Constructor function*

14. **Finding non-repeating elements from an array:**
    *   *Write a function that takes an array of numbers and returns a new array containing only the elements that appear once.* (This is a coding challenge.)

15. **Object methods:**
    *   *How do you define a method on an object? (Give examples using both object literal syntax and adding methods to an existing object)*
    *  *Explain `this` in object method.*

16. **`console.log(1 + +'1')` - Implicit type coercion:**
    *   *What will be the output of `console.log(1 + +'1')`?  Explain why.* (This tests understanding of the unary plus operator and type coercion.)

17. **`console.log('A' - 1)` - Implicit type coercion:**
    *   *What will be the output of `console.log('A' - 1')`? Explain why.* (Tests understanding of type coercion with the subtraction operator.)

18. **Find object key with highest value (and largest value):**
    *   *Given an object where the values are numbers, write a function to find the key associated with the highest value.* (Coding challenge)

19. **Call by value vs. call by reference:**
    *   *Explain the difference between call by value and call by reference.*
    *   *In JavaScript, are primitive types passed by value or by reference?*
    *   *In JavaScript, are objects passed by value or by reference?  Explain with an example.*
    *   *How can you create a true copy of an object in JavaScript to avoid unintended modifications?*

20. **`splice()` method:**
    *   *What does the `splice()` method do?  Explain its parameters.*
    *   *How can you use `splice()` to add, remove, and replace elements in an array?*
    *  *What is the return value of `splice()`*

21. **Reverse a string:**
    *   *Write a function to reverse a string in JavaScript (without using the built-in `reverse()` method).* (Coding challenge)

22. **Check if an object is empty:**
    *   *Write a function that takes an object as an argument and returns `true` if the object is empty (has no own properties), and `false` otherwise.*

23. **Rest vs. Spread operators:**
    *   *What is the difference between the rest operator and the spread operator?  Give examples of each.*
    *   *How can you use the spread operator to copy an array or object?*
    *   *How can use the spread operator to merge to object.*

24. **Callback functions:**
    *   *What is a callback function?  Provide an example.*
    *   *Why are callback functions important in asynchronous JavaScript?*
    *   *What is "callback hell," and how can you avoid it?*

25. **Polyfills:**
    *   *What is a polyfill?  Why are they used?*
    *   *Give an example of a JavaScript feature that might need a polyfill for older browsers.*

26. **Debouncing:**
    *   *What is debouncing?  Explain a scenario where it would be useful.*
    *   *Implement a simple `debounce` function in JavaScript.* (Coding challenge)

27. **Timer functions (`setInterval`, stopping after a time):**
    *   *Explain the difference between `setTimeout` and `setInterval`.*
    *   *How can you stop a `setInterval` from running?*
    *   *Write a function that logs a message to the console every second for 5 seconds, and then stops.* (Coding challenge)

28. **`reduce()` method (multiple examples: total characters, sum, etc.):**
    *   *Explain how the `reduce()` method works. What are its parameters?*
    *   *Use `reduce()` to calculate the sum of an array of numbers.*
    *   *Use `reduce()` to find the maximum value in an array.*
    *   *Use `reduce()` to count the number of occurrences of each element in an array (creating a frequency map).*

29. **`flatMap()` method:**
     *   *Explain how the `flatMap()` method works*
     *   *Give example of `flatMap()`.*

30. **Print first 10 even numbers with a time delay:**
    *   *Write a function that prints the first 10 even numbers, with a 1-second delay between each number.* (Coding challenge - combines timers and loops)

31. **Function borrowing:**
    *  *Explain Function borrowing with the help of call, apply and bind*

32. **Limitations of closure:**
    *   *What are some potential drawbacks or limitations of using closures? (e.g., memory usage)*
    *   *Explain how closures can lead to memory leaks if not used carefully.*

33. **`promise.race` vs `promise.any`:**
    *   *Explain the difference between `Promise.race` and `Promise.any`.*
    *   *In what scenarios would you use each of these methods?*

34. **Proxy object:**
    *  *What is proxy object*
    * *What is handler in proxy object*
    * *What is the use of proxy*

35. **Shallow copy vs. Deep copy (multiple mentions):**
    *   *Explain the difference between a shallow copy and a deep copy of an object.*
    *   *What are the different ways to create a shallow copy of an object in JavaScript?*
    *   *What are the different ways to create a deep copy of an object in JavaScript? (including the structured clone algorithm)*
    *   *When would you need a deep copy instead of a shallow copy?*

36. **Currying:**
    *   *What is currying?  Provide an example.*
    *   *What are the benefits of using currying?*

37. **Event bubbling (multiple mentions):**
    *   *Explain event bubbling in the DOM.*
    *   *How can you stop event bubbling?*
    *   *What is the event phase for bubbling?*

38. **Event propagation:**
 *   *What is event propagation?*
 *   *Explain different phases in event propagation*

39. **Event capturing:**
    *   *Explain event capturing in the DOM.*
    *   *How do you add an event listener that uses the capturing phase?*
 *   *What is the event phase for capturing?*

40. **Event delegation:**
    *   *What is event delegation?  Why is it useful?*
    *   *Provide an example of how to implement event delegation.*

41. **Arrow functions vs. regular functions (`this` keyword differences):**
    *   *How does the `this` keyword behave differently in arrow functions compared to regular functions?*
    *   *When would you choose to use an arrow function, and when would you choose a regular function?*
    *  *Can you `bind` this in arrow function?*
    * *Do arrow functions have their own `arguments` object?*

42. **Hashmap:**
 *   *How can you implement hashmap*
 *   *What is use of hashmap*

43. **String builder and string buffer:**
    * *Explain String builder and string buffer*
    *   *Are they mutable?*

44. **String immutability:**
 * *What does it mean to say that strings are immutable in JavaScript?*
 *   *What are the implications of string immutability for performance?*
   *  *If strings are immutable, how is it possible to perform operations like concatenation or substring extraction?*

45. **Operator precedence:**
   * *Explain operator precedence*
   * *Give example*

46. **Implicit type conversion:**
 *  *What is implicit type coercion in JavaScript?*
 *   *Give some examples of implicit type coercion that can lead to unexpected results.*

47. **Explicit type casting:**
  * *How can you explicitly convert a value from one type to another in JavaScript?  (e.g., `Number()`, `String()`, `parseInt()`, `parseFloat()`)*

48. **Interface:**
  * *What is use of interface*
 * *Explain interface*

49. **Declare static array:**
 * *Can we declare static array in js. If No then Why?*

50. **Prime number (algorithm):**
    *   *Write a function to determine if a given number is prime.* (Coding challenge)

51. **Fibonacci series (algorithm):**
    *   *Write a function to generate the nth Fibonacci number (both recursively and iteratively).* (Coding challenge)

52. **Identifier:**
  *   *What is an identifier in JavaScript?*
  *  *What are the rules for naming identifiers?*

53. **Keywords:**
 * *What is key word ?*
 *  *List down few keywords.*

54. **Literals (Octal, Binary):**
 * *How do you represent octal and binary numbers in JavaScript?*

55. **Escape sequence:**
 *   *What is an escape sequence?  Give some examples.*
 * *How can you include a special character (like a newline or a quote) within a string?*

56. **Stream API:**
*   *What is the Streams API in JavaScript?*
    *  *What problems does the Streams API solve?*
    *  *What are the core concepts of the Streams API (readable streams, writable streams, transform streams, piping)?*
    * *Give a basic example of creating and using a readable stream.*

57. **`filter()` method:**
    *   *Explain how the `filter()` method works. What does it return?*
    *   *Use `filter()` to create a new array containing only the even numbers from an array.*

58. **`map()` method:**
    *   *Explain how the `map()` method works.  What does it return?*
    *   *Use `map()` to create a new array where each element is the square of the corresponding element in the original array.*

59. **`forEach()` vs `map()`:**
    *   *What is the key difference between `forEach()` and `map()`?*
    *   *When would you use `forEach()` instead of `map()`, and vice-versa?*

60. **`map()` vs `flatMap()`:**
   * *What is key difference between them.*

61. **Map and HashMap (data structure):**
* *Explain the difference.*

62. **Collection framework:**
 *   *What is collection framework*

63. **Set (data structure):**
   * *What is `Set`*
   * *How does a `Set` differ from an `Array`?*
    * *How can you add and remove elements from a `Set`?*
   * *How can you check if a `Set` contains a particular value?*

64. **Copy constructor:**
* *What is Copy constructor*
* *What is the use of it*

65. **`throw` and `throws` keywords:**
  * *Explain these keywords*
  * *What is the difference*

66. **Generics:**
 * *What is Generics*
 *   *What are the benefits of using generics?*

67. **BOM (Browser Object Model) uses:** (Covered extensively in previous responses - focus on the questions there)

68. **Toggle checkbox by button click (DOM manipulation):**
    *   *Write the HTML and JavaScript code to toggle the checked state of a checkbox when a button is clicked.* (Coding challenge)

69. **Disable right click of a button (DOM manipulation):**
    *   *Write the JavaScript code to prevent the context menu from appearing when a user right-clicks on a specific button.* (Coding challenge)

70. **DOM manipulation problems/practice:** (This is a broad category - practice various DOM manipulation tasks)

71. **Event management practice:** (Also broad - practice handling different types of events)

72. **Web API vs REST API:**
 * *Differentiate b/w them*

73. **Applications of generator functions:** (Covered in #12)

74. **Remove multiples of 3 from an array:**
    *   *Write a function that takes an array of numbers and returns a new array with all multiples of 3 removed.* (Coding challenge)

75. **Find student with highest score from array of objects:**
    *   *Given an array of student objects (each with a `name` and `score` property), write a function to find the student with the highest score.* (Coding challenge)

76. **Different ways of creating objects:**
    *   *What are the different ways to create objects in JavaScript? (object literal, constructor function, `Object.create()`, ES6 classes)*

77. **How to create a class (Classes):**
    *   *How do you define a class in JavaScript (using ES6 syntax)?*
    *   *How do you create an instance of a class?*
    *   *How do you define methods and properties within a class?*
    *   *How does inheritance work with ES6 classes?*

78. **Promise creation and usages:**
    *   *How do you create a Promise in JavaScript?*
    *   *Explain the different states of a Promise (pending, fulfilled, rejected).*
    *   *How do you handle the result of a Promise using `.then()` and `.catch()`?*
    *   *What is promise chaining?*

79. **Event loop & code execution:**
    *   *Explain how the event loop works in JavaScript.*
    *   *What is the call stack?*
    *   *What is the task queue (or callback queue)?*
    *   *How do microtasks (like Promise callbacks) differ from macrotasks (like `setTimeout` callbacks) in terms of the event loop?*

80. **Dynamic typing:**
   *  *What does it mean to say that JavaScript is a dynamically typed language?*
    *   *What are the advantages and disadvantages of dynamic typing?*

81. **Truthy/Falsy values (multiple mentions):**
    *   *What are truthy and falsy values in JavaScript?  List all the falsy values.*
    *   *How can you use truthy/falsy values in conditional statements?*

82. **ECMAScript:**
 * *What is ECMAScript?*
  *   *What is the relationship between ECMAScript and JavaScript?*
  *   *What is the role of the TC39 committee?*

83. **Is `undefined` an object?:**
    *   *What is the type of `undefined` in JavaScript?* (Trick question!)

84. **WeakRef:**
    *   *What is a `WeakRef` in JavaScript?*
    *   *How does a `WeakRef` differ from a regular object reference?*
      * *What is use of weekRef*

85. **Prototype chain:** (Covered in #9)

86. **Strict mode:**
    *   *What is strict mode in JavaScript?  How do you enable it?*
    *   *What are some of the benefits of using strict mode?*

87. **`Promise.all` vs `Promise.allSettled`:**
    *   *Explain the difference between `Promise.all` and `Promise.allSettled`.*
    *   *When would you use each of these methods?*

88. **Remove an object key:**
    *   *How can you remove a property from an object in JavaScript?* (Using `delete`)

89. **Destructuring:**
    *   *What is destructuring in JavaScript?  Provide examples of array destructuring and object destructuring.*
    *   *How can you use destructuring to swap the values of two variables?*
    *   *How can you use destructuring with default values?*

90. **Remove nth element from array:**
 * *Write a code for removing nth element*

91. **String coercion:** (Covered under implicit/explicit type conversion)

92. **`==` vs `===`:**
    *   *What is the difference between the `==` (loose equality) and `===` (strict equality) operators in JavaScript?*
    *   *Why is it generally recommended to use `===` instead of `==`?*

93. **Boolean coercion:** (Covered under truthy/falsy values)

94. **`this` keyword:** (Covered in multiple places - crucial topic!)

95. **Objects:** (Very broad - covered by many other questions)

96. **Cookie vs Cache:**
 * *Explain the difference b/w Cookie and cache*

97. **Bitwise operators:**
    * *Explain bitwise operator.*

98. **Nullish coalescing operator (`??`):**
    *   *What does the nullish coalescing operator (`??`) do?  How is it different from the OR operator (`||`)?*
    *   *Provide an example of when you would use `??` instead of `||`.*

99. **Optional chaining (`?.`):**
    *   *What does the optional chaining operator (`?.`) do?*
    *   *How can it help prevent errors when accessing nested properties of an object that might be `null` or `undefined`?*

100. **`console.log(null == undefined)`:**
    *   *What will be the output of `console.log(null == undefined)`?  Explain why.* (Tests understanding of loose equality)

101. **Array/Object/String workout problems:** (Practice, practice, practice!)

102. **Variable shadowing:** (Covered in #11)

103. **`new Set()`:** (Covered in #63)

104. **`.has()` method:**
  *  *Explain `.has()` method with the help of example*

105. **`Array.from()`:**
     *   *What does `Array.from()` do?  Give examples of its use.*
    *  *How can you use `Array.from()` to create an array from an array-like object or an iterable?*

106. **`lastIndexOf()`:**
  *  *Explain `lastIndexOf()`*

107. **Symbol:**
 *    *What is a `Symbol` in JavaScript?*
  *   *How are Symbols unique?*
    *  *What are some use cases for Symbols (e.g., preventing property name collisions, creating well-known Symbols)?*

108. **`Object.entries()`:**
   *  *What does `Object.entries()` return?  Provide an example.*
   *  *How can you use `Object.entries()` to iterate over the key-value pairs of an object?*

109. **Sorting (arrays, objects):**
     *   *How can you sort an array of numbers in ascending or descending order?*
     *   *How can you sort an array of objects based on a specific property?*
 * *Can you sort an object. If yes Then How?*

110. **Matching elements in two different arrays:**
     *   *Write a function that takes two arrays and returns a new array containing only the elements that are present in both arrays.* (Coding challenge)

111. **Splitting string with space:**
* *Write code to split the string.*

112. **Palindrome check:**
    *   *Write a function to determine if a given string is a palindrome.* (Coding challenge)

113. **`WeakMap`:**
    *  *What is a `WeakMap` in JavaScript?*
    *  *How does a `WeakMap` differ from a regular `Map`?*
    *  *What are the use cases for `WeakMaps` (e.g., associating private data with objects)?*

114. **JSON methods:**
  *   *What are `JSON.stringify()` and `JSON.parse()`?  What do they do?*
 *   *How can you handle errors that might occur during JSON parsing?*
    *   *What are the limitations of `JSON.stringify()` (e.g., it cannot serialize functions, circular references)?*

115. **Find second highest element in an array:**
     *   *Write a function that takes an array of numbers and returns the second highest number.* (Coding challenge)

116. **Sum of numbers from object:**

117. **Array empty check:**
 * *How do check array is empty or not?*

118. **Object empty check:** (Covered in #22)

119. **Single purpose aggregation:**

120. **Throttling:**
 *   *What is throttling?  Explain a scenario where it would be useful.*
 *   *Implement a simple `throttle` function in JavaScript.* (Coding challenge)

121. **Event loop:** (Covered in #79)

122. **`appendChild` vs `removeChild`:** (Covered in BOM/DOM section)

123. **`event.preventDefault`:** (Covered in BOM/DOM section)

124. **Functions vs methods:**
     *   *What is the difference between a function and a method in JavaScript?*

125. **Factory Functions:**
  *   *What is a factory function in JavaScript?*
    * *How does a factory function differ from a constructor function?*
    *  *What are the advantages of using factory functions?*

126. **V8 engine:**
    *   *What is the V8 engine?*
    * *Which browsers use the V8 engine?*

127. **Hoisting:**
    *   *What is hoisting in JavaScript?*
    *   *How does hoisting work with `var`, `let`, and `const` declarations?*
    *   *How does hoisting work with function declarations and function expressions?*
 *  *What is the temporal dead zone (TDZ)?*

128. **Single Thread vs synchronous:**
 * *Js is single threaded or synchronus? Explain*

129. **Synchronous vs asynchronous:**
   *  *What is the difference between synchronous and asynchronous code execution in JavaScript?*
    * *Why is asynchronous programming important in JavaScript?*
    * *What are the different ways to handle asynchronous operations in JavaScript (callbacks, Promises, async/await)?*

130. **Blocking vs Non-Blocking:**
 *  *Explain blocking vs non-blocking with example*

131. **Shortest word from string:**
* *Write code for finding shortest word from string*

132. **State in promises:** (Covered in #78)

133. **Promise methods:** (Covered in various questions about Promises)

134. **`includes()`:**
  * *How use `includes()`*

135. **Memoization:**
   *   *What is memoization?  Explain how it can improve performance.*
    *  *Implement a simple `memoize` function in JavaScript.* (Coding challenge)

136. **Primitive vs Non -Primitive:**
     *  *Explain the difference between primitive and non-primitive data types in JavaScript.*
    *   *List the primitive data types in JavaScript.*
    *    *How do primitive and non-primitive data types behave differently in terms of assignment and comparison?*

137. **Var , let , const:**
    *   *Explain the difference between `var`, `let`, and `const`.*
    *   *What is the scope of a variable declared with `var`?*
    *   *What is the scope of a variable declared with `let` or `const`?*
    *   *Why is it generally recommended to use `let` and `const` instead of `var`?*

138. **Block {}**:
  *  *Explain Block in js.*

139. **Array map**:
* *Explain map in array*

