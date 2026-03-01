// //  There are three ways to declare a variables:
// var name = "Gopal"; // Old way - (function scoped, hoisting issues)
// let age = 25; // Use for value that CHANGE
// const PI = 3.14; // Use for vlaues that DON'T change

// age = 20; // allowed
// // PI = 3; // Error! Can't reassign const

// ---- Functions  ----
// Regular function

// function greet(name) {
//   return "Hello, " + name;
// }
// function about(name, age, city) {
//   return `Name: ${name} | Age: ${age} | City: ${city}`;
// }

// console.log(greet("Gopal"));
// console.log(about("Gopal", 20, "Purulia"));

// Arrow function (modern, shorter)
// const greet = (name) => "Hello, " + name;
// console.log(greet("Gopal Mahato"));

// Arrow function with default parameter
// const greet = (name = "Stranger") => `Hello, ${name}!`;
// console.log(greet("Gopal Mahato"));

//  Objects
// Objects store related data as key-value pairs.

// // Creating an Object
// const user = {
//   name: "Gopal",
//   age: 20,
//   isAdmin: true,
//   greet() {
//     return `Hi, I'm ${this.name}`; // 'this refers to the object itself'
//   },
// };

// // Accessing values
// console.log(user.name); // Gopal
// console.log(user.age); // 20
// console.log(user.greet()); // Hi, I,m Gopal

// // Destructuring  (clean way to extract values)
// const { name, age } = user;
// console.log(name, age);

// --------async/await----------
// Used to handle asynchronous operations (like API calls) without blocking code.
// Simulating an API call (returns a Promise after 1 second)
// const fetchUser = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ id: 1, name: "Gopal" }), 1000);
//   });
// };

// // Using async/await
// const getUser = async () => {
//   console.log("Fethching...");
//   const user = await fetchUser(); // waits here until promise resolves
//   console.log("Got user: ", user);
// };
// getUser();

//    -------- try/catch -------
// Used to handle errors gracefully so our app doesn't crash

const fetchData = async () => {
  try {
    const response = await fetch("https://api.example.com/data"); // might fail
    const data = await response.json();
    console.log("Data: ", data);
  } catch (error) {
    console.log("Something went wrong: ", error.message); // handles the error
  } finally {
    console.log("DONE!"); // always runs, success or failure
  }
};
