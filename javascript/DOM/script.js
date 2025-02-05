// document.querySelector("h1")
// document.querySelector(".h1")
// document.querySelector("#h1")

// let element = document.getElementById("mydiv"):


var a = document.querySelector("h1");
a.innerHTML ="Hewllo";
a.innerHTML ="<h1>Helloo</h1";
a.textContent="hii"


a.style.color="red"
a.style.backgroundColor="black"


a.addEventListener("click",function(){
    alert("Hello");
})




var bulb = document.getElementById("bulb");

let btn =document.getElementById("button");
var state = 0;
btn.addEventListener("click",()=>{
    if(state==0){
    bulb.style.backgroundColor="red";
    state=1;
    btn.innerHTML="off";
    }
    else if(state==1){
        bulb.style.backgroundColor="white";
        btn.innerHTML="on"
        state = 0;
    }
})




