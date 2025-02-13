// function createOrder(cart){
//     const orderId = 4567;
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if(cart.length > 0){

//                 resolve(orderId);
//             } else {
//                 reject("Cart is empty! Cannot create order.");
//             }
//         }, 2000);
//     });
// }

// function proceedToPayment(orderId){
//     return new Promise((res,rej)=>{
//         setTimeout(()=>{
//             console.log("Proceeding to payment for Order ID:", orderId);
//             res("Payment successful");
//         }, 2000);
//     })
// }

// const cart = ["shoes", "pants", "kurta"];
// const promise = createOrder(cart)
// console.log(promise)
// promise.then((orderId)=>{
    

//     return proceedToPayment(orderId);

// })
// .then((paymentInfo)=>{
//     console.log(paymentInfo);
// })


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(false) {
            resolve("Promise resolved");
        } else {
            const error = new Error("Promise rejected");
            reject(error);
        }
    }, 2000);
}
);

promise.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.log(error.message);
});