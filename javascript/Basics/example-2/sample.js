const user = [
    { firstname: "Mohammad", lastname: "Noushad", age: 22 },
    { firstname: "Aniket", lastname: "Bhalla", age: 45 },
    { firstname: "Bidhi", lastname: "Chand", age: 21 },
    { firstname: "Saif", lastname: "Siddiqi", age: 67 },
  ];

// list of full name

// const output = user.map(x=> x.firstname + " " + x.lastname);
// console.log(output);


// age count
const unique = user.reduce((acc,cur)=>{
    if(acc[cur.age]){
        acc[cur.age] = ++acc[cur.age];
    }else{
        acc[cur.age] = 1
    }
    return acc;
},{})

console.log(unique)


// using map filter
const ageLessThen30 = user.filter((cur)=>cur.age<30).map((name)=>name.firstname)
console.log(ageLessThen30);

// sinmg reduce
// const names = user.reduce((acc,cur)=>{
//     if(cur.age<30){
//         acc.push(cur.firstname);
//     }
//     return acc;
// },[])


// const names = user.reduce((acc, cur) => {
//     if (cur.age < 30) {
//         acc[cur.age] = cur.firstname; // Store first name by age
//     }
//     return acc; // Make sure to return the accumulator
// }, {}); // Initialize accumulator as an empty object

// console.log("fnames", names);


const names = user.reduce((acc, cur) => {
    if (cur.age < 30) {
        acc[cur.firstname] = cur.lastname; // Store first name by age
    }
    return acc; // Make sure to return the accumulator
}, {}); // Initialize accumulator as an empty object

console.log("fnames", names);








const currentDate = new Date(); // Get the current date and time
const hours = currentDate.getHours(); // Get the current hour (0-23)

let greeting;

switch (true) {
  case (hours >= 5 && hours < 12):
    greeting = "Good Morning!";
    break;
  case (hours >= 12 && hours < 17):
    greeting = "Good Afternoon!";
    break;
  case (hours >= 17 && hours < 21):
    greeting = "Good Evening!";
    break;
  default:
    greeting = "Good Night!";
}

console.log(greeting); // Output depends on the current time
