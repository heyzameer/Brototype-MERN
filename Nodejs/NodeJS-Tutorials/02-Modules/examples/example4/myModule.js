// myModule.js
(function(module, exports) {
    // Private variable
    var privateCounter = 0;
  
    // Private function
    function privateFunction() {
      privateCounter++;
      console.log('Private counter incremented:', privateCounter);
    }
  
    // Public function accessible via the module
    exports.publicFunction = function() {
      privateFunction(); // Accessing the private function
      console.log('Public function called');
    };
  
    //Export an object
    exports.myObject = {
        name: "Example",
        value: 123
    }
  
  })(module, exports);