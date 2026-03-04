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

// const fetchData = async () => {
//   try {
//     const response = await fetch("https://api.example.com/data"); // might fail
//     const data = await response.json();
//     console.log("Data: ", data);
//   } catch (error) {
//     console.log("Something went wrong: ", error.message); // handles the error
//   } finally {
//     console.log("DONE!"); // always runs, success or failure
//   }
// };

/// More Understanding Async and Await
// PROBLEM: This takes time. What heppens while we wait?
// const data = fetch("https://api.example.com/users"); // takes two seconds
// console.log(data); // runs IMMEDIATELY - gets undefined, not real data!

// This is why we need a way to say "wait for this before continuing".
// /// /// Step 2: Promises (the foundation of async/await)
/*
A promise is like a food order ticket at a restaurant:
>>> We place an order (start a task)
>>> We get a ticket (Promise)
>>> Later: food arrives resolve OR kitchen says "out of stock" reject
*/
// const myPromise = new Promise((resolve, reject) => {
//   const success = true;

//   if (success) {
//     resolve("Here is your data!");
//   } else {
//     reject("Something went worng");
//   }
// });

// // Old way to consume a promise (.then/ .catch)
// myPromise
//   .then((result) => console.log(result)) // Here is your data
//   .catch((error) => console.log(error));

//// Step 3 --- async//await (clean way to use Promises)
// async/await is the cleaner syntax for Promises. Same thing, easier to read.

// This function SIMULATES fetching user data (takes 2 seconds)
// const fetchUser = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ id: 1, name: "Gopal", age: 20 });
//     }, 2000);
//   });
// };

// // async/await version
// const getUser = async () => {
//   console.log("1. Starting fetch...");

//   const user = await fetchUser(); // PAUSES here until promise resolves
//   console.log("2. Got user: ", user);
//   console.log("3. Done!");
// };

// getUser();

// Await can only be used inside an async function async function always returns a Promise

////////  Step 4 Multiple awaits in sequence
const fetchUser = () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res({
          name: "Gopal Mahato",
          age: 20,
          city: "Purilia",
          core_languages: ["Python", "JS"],
        }),
      1000,
    ),
  );
const fetchPosts = () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res([
          "Post 1",
          "Post 2",
          "Post 3",
          "Post 4",
          "Post 5",
          "Post 6",
          "Post 7",
        ]),
      1000,
    ),
  );
const fetchFollowers = () =>
  new Promise((res) => setTimeout(() => res(120), 500));

// const loadProfile = async () => {
//   console.log("Loading...");
//   const user = await fetchUser(); // waits 1s
//   const posts = await fetchPosts(); // waits another 1s
//   const followers = await fetchFollowers(); // waits another 0.5s

//   console.log("User: ", user.name, user.age, user.city, user.core_languages);
//   console.log("Posts: ", posts);
//   console.log("Followers: ", followers);
// };
// loadProfile();
// // Total wait: ~2.5 seconds (runs ONE by ONE)

// Running them in PARALLEL when they don't depend on each other.
// const loadProfileFast = async () => {
//   console.log("Loading fast...");

//   // starting all at the same time
//   const [user, posts, followers] = await Promise.all([
//     fetchUser(),
//     fetchPosts(),
//     fetchFollowers(),
//   ]);
//   console.log("User data: ", user.name, user.age, user.core_languages);
//   console.log("Posts: ", posts);
//   console.log("Followers: ", followers);
// };

// loadProfileFast(); // Total wait: ~1 (runs ALL at ONCE)

/////  ---- Step 5 Try/Catch with async//await
// When await falis (promise rejects), it throws an error. You must catch it.
// const fetchData = (shouldFail) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldFail) reject(new Error("Server is down!"));
//       else resolve({ data: "Here is your data" });
//     }, 1000);
//   });
// };

// const getData = async () => {
//   try {
//     const result = await fetchData(false); /// Passing true to simulate failure
//     console.log("Success: ", result);
//   } catch (error) {
//     console.error("Caught error: ", error.message);
//   } finally {
//     console.log("This always runs - cleanup here"); // runs no matter what
//   }
// };

// getData();

//------ Step 6: Real World Example (Fake API)
// Fake database
// const usersDB = [
//   { id: 1, name: "Gopal", role: "admin" },
//   { id: 2, name: "Ujjwal", role: "admin" },
// ];

// // Simulating API calls
// const getUser = (id) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const user = usersDB.find((u) => u.id == id);
//       if (user) resolve(user);
//       else reject(new Error(`User ${id} not found`));
//     }, 800);
//   });

// const getPermissions = (role) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       const perms = role === "admin" ? ["read", "write", "delete"] : ["read"];
//       resolve(perms);
//     }, 500);
//   });

// // // // MAIN Function

// const loadUserDashBoard = async (userId) => {
//   try {
//     console.log(`Loading dashboard for user ${userId}...`);
//     const user = await getUser(userId);
//     console.log(`Found user: ${user.name}`);

//     const permissions = await getPermissions(user.role);
//     console.log(`Permissions: ${permissions.join(", ")}`);

//     console.log("\n--- Dashboard Ready ---\n");
//     console.log(`Welcome, ${user.name}!`);
//     console.log(`You can: ${permissions.join(", ")}`);
//   } catch (error) {
//     console.error(`Failed to load dashboard: ${error.messages}`);
//   } finally {
//     console.log("Loading complete.");
//   }
// };

// loadUserDashBoard(1);
// loadUserDashBoard(11);

//  --------------------------------------------------
// -----------------------------------------------------
// Create a function called 'delay' that waits N milliseconds
// Then create an async function that:
// 1. Logs "Start"
// 2. Waits 2 seconds
// 3. Logs "End"

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log("Start");
  await delay(2000);
  console.log("End");
}
run();
