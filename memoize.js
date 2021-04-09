// Callback
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Callback");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

var users = [
  {
    id: "12d",
    email: "tyler@gmail.com",
    name: "Tyler",
    address: "167 East 500 North",
  },
  {
    id: "15a",
    email: "cahlan@gmail.com",
    name: "Cahlan",
    address: "135 East 320 North",
  },
  {
    id: "16t",
    email: "ryan@gmail.com",
    name: "Ryan",
    address: "192 East 32 North",
  },
];

var getUserById = function (users, id, cb) {
  let user = users.find((x) => x.id == id);
  cb(user);
};

getUserById(users, "16t", function (user) {
  console.log(
    "The user with the id 16t has the email of " +
      user.email +
      " the name of " +
      user.name +
      " and the address of " +
      user.address
  );
});

// Memoization
let times10 = (n) => n * 10;

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Memoization");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
let cache = {};

const memoTimes10 = (n) => {
  if (n in cache) {
    console.log("fetching from cache:", n);
    return cache[n];
  } else {
    console.log("calculating");
    let result = times10(n);
    cache[n] = result;
    return result;
  }
};

console.log("calculated value:", memoTimes10(9)); // calculated
console.log("cached value:", memoTimes10(9)); // cached

// Memoization with closure

console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Memoization with closure");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

const memoizedClosureTimes10 = () => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log("fetching from cache:", n);
      return cache[n];
    } else {
      console.log("calculating");
      let result = n * 10;
      cache[n] = result;
      return result;
    }
  };
};

const memoClosureTimes10 = memoizedClosureTimes10();
console.log("calculated value:", memoClosureTimes10(9)); // calculated
console.log("cached value:", memoClosureTimes10(9)); // cached

// Memoization with closure & callback function
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("Generic Memoize Function");
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

const memoize = (cb) => {
  let cache = {};
  return (n) => {
    if (n in cache) {
      console.log("fetching from cache:", n);
      return cache[n];
    } else {
      console.log("calculating");
      let result = cb(n);
      cache[n] = result;
      return result;
    }
  };
};
const memoizedTimes10 = memoize(times10);
console.log("calculated value:", memoizedTimes10(9)); // calculated
console.log("cached value:", memoizedTimes10(9)); // cached