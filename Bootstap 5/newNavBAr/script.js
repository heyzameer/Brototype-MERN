
function onbtn(){
    var box = document.getElementById("box");
      box.innerHTML="hello"
    }



let box = document.getElementById("box");
let btn = document.getElementById("btn");
let state = 0;

btn.addEventListener("click", () => {
   
        (box.style.backgroundColor == "yellow")? box.style.backgroundColor = "red" : box.style.backgroundColor = "yellow";

});


