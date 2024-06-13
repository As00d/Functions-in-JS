'use strict';

// default parameters section
const arr = [];
const createBooking = function (
  flightNum = '23UPS',
  passengerNum = 1,
  pricing = passengerNum * 2999
) {
  // ES5 and before
  // passengerNum = passengerNum || 1;
  // pricing = pricing || 2999;
  const booking = {
    flightNum,
    passengerNum,
    pricing,
  };
  arr.push(booking);
};
createBooking('UK2349', 6);
// Also if we want to skip passing a parameter and want it to take default value we can simply pass undefined
console.log(arr);
// We can also use parameters which were defined before in the expression jsut like we used for pricing value
// So we can set default values for the functions is not passed we looked at an old way and also the current way which is more intuitive.

// Topic Pass by reference and pass by value

const flight = 'AB890';
const passenger = {
  name: 'anki',
  passportNumber: 792739283,
};

const checkIn = function (flightNum, passengerDetails) {
  flightNum = 'CD890';
  passengerDetails.name = 'Er. ' + passengerDetails.name;

  // check if passport number is valid
  if (passengerDetails.passportNumber === 792739283) {
    return true;
  }
};

checkIn(flight, passenger);
console.log(flight);
console.log(passenger);

// So the takeaway from this lecture is when we pass in object into a function and manipulate its value within the function the original value gets changed so we need to be extra careful with these kind of behaviours

// First class and high order function in js
// first class functions programming language functions unko as a variable treat krna is first class function. Now if programming language supports the first class functions then it will have high order functions

// High order functions are basically functions which can have function as a parameter and can also return function from them. or both (either of the condition is met then its an high order function)

// Lets create our own high order function to understand the concept better

// This function responsible for removing all white spaces from the string
const oneWord = function (word) {
  return word.replaceAll(' ', '').toLowerCase();
};

// Another function responsible for taking the first word to uppercase
const upperCaseWord = function (word) {
  const arr = word.split(' ');
  const [firstWord, ...restWords] = arr;
  console.log(firstWord, restWords);
  const str = [firstWord.toUpperCase(), ...restWords].join(' ');
  return str;
};
// Lets now create a high order function

const transformer = function (str, fn) {
  console.log(`This is without transformed string : ${str}`);
  console.log(`This is transformed string : ${fn(str)}`);
  console.log(`This is transformed string : ${fn.name}`);
};

transformer('Javascript is a fun language 👍🏻', oneWord);
transformer('Javascript is a fun language 👍🏻', upperCaseWord);

// one eventlistner eg
// js uses call back functions all the time

const high5 = function () {
  console.log('👋');
};

document.body.addEventListener('click', high5);

// The 2 main advantage of using callback or high order function is
// 1. to have a cleaner and better code
// 2. to achieve abstraction

// High order functions : function returning a function

const greet = function (greet) {
  return function (name) {
    console.log(`${greet} ${name}`);
  };
};
const nameOfPerson = greet('Hello Good afternoon!!');
nameOfPerson('Anki');

// The above can be written as

greet('Hello good morning')('anki');

// Challenge to write above method using arrow functions

const greetArrow = greet => name => console.log(`${greet} ${name}`);

greetArrow('Hello')('bni');

// The call and apply methods
// In this lecture we want to set this keyword manually and want to understand why we want to do that . Lets take an example

const vistara = {
  airline: 'Vistara',
  flightCode: 'UK',
  booking: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat in ${this.airline} airline with code ${this.flightCode}${flightNum}`
    );
    this.booking.push({ flight: `${this.flightCode}`, name: `${name}` });
  },
};

vistara.book('87', 'Anki');
vistara.book('97', 'Bni');
console.log(vistara.booking);

const euroWings = {
  airline: 'Vistara',
  flightCode: 'UK',
  booking: [],
};
// Does not work
const book = vistara.book;
// book('23','sara William')
book.call(euroWings, '23', 'sara William');
book.call(vistara, '23', 'sara William');

console.log(euroWings);
console.log(vistara.booking);

// apply method
// The only difference between apply method and call method apply method expects an array as its parameter, whereas in call its diffrent value separated by comma.
book.apply(euroWings, ['23', 'sara William']);

// Bind method
// Just like call and apply method bind keyword also allows us to set the this keyword separately. The difference it does not directly call the function instead it returns a new function where this function is bind.

const euroWing = book.bind(euroWings, 32);
euroWing('arun');
euroWing('arunima');
euroWing('arav');
euroWing('arjun');

console.log(euroWings);
// so when we are passing some of the arguments then we call partial application

// Where else we can use these bind method ? We already one it is used when we want to borrow method from an object so we bind that function.
// One is using it with event listner
vistara.planes = 300;
console.log(vistara);
vistara.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

const element = document.querySelector('.buy');
element.addEventListener('click', vistara.buyPlane.bind(vistara));
console.log(vistara);
// Here in this case this points to element so when we do ++ it return nan This keyword when attached to eventListener method then it points to the element on which eventListner is added

// Another example using partial application
// so what we have in here ?? We simply created a function taxCalculator now say for India tax this year is 20 so we want create a function keeping this value as default

const taxCalculator = (tax, amount) => {
  return amount + amount * tax;
};
const taxCalculatorIndia = taxCalculator.bind(null, 20);

console.log(taxCalculatorIndia(100));

// Now one might think we could have done it via default parameter but here in this case we r creating a new method itself what if you want to create another method for vietnam where tax = 0.13 so via default we had to pass this paramter but if create a new method out of generic method it is much better

const taxCalculatorSpain = taxCalculator.bind(null, 0.13);
console.log(taxCalculatorSpain(1339));

// Reframe this method to create above scenario

const taxCal = function (tax) {
  return function (amount) {
    return amount + amount * tax;
  };
};

const val = taxCal(0.1);
console.log(val(100));

// Coding challenge 1
/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer: function () {
    // user input
    let value = Number(
      prompt(
        `${this.question} \n${this.options.join('\n')} \n (Write option number)`
      )
    );
    // register answer - eg of short circuit also
    typeof value === 'number' &&
      value < this.answers.length &&
      this.answers[value]++;

    this.displayResults('string');
    this.displayResults('');
  },
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type === 'array') {
      console.log(...this.answers);
    }
  },
};

// Call this method whenever the user clicks the "Answer poll" button.
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// Bonus question resolution :

poll.displayResults.call({ answers: [5, 2, 3] }, 'array');

//  Topic name : IIFE- immediately invoked function expression
/* In coding there might be a case where we don't want to call a function twice or may be call it once. But if we write a function there is no restriction on how much i can call. So there is way in js i.e using IIFE */

const callOnce = function () {
  console.log('Can call me more than once no limits ');
};
callOnce();
callOnce();
callOnce();

// function declaration wrap it in () and then call it using ()
(function () {
  console.log('you can call me only once');
})();

// arrow function expression
(() => console.log('I am arrow, u can call me once only'))();

// One way for creating these IIFE was to have a function that can be immediately called but also was for scoping. But since now we do use let and const which are scoped already so this is not the main purpose it serves now

// Closures in JS vvi
// closure is not something like we create an array, objects it something that happens

// lets take a very simple example of lexical scoping
function x() {
  let a = 1;
  function y() {
    console.log(a);
  }
  return y;
}
const z = x();
z();
// functions are heart of js programming we can do anything we can pass function as a parameter to the function, return function also
// Closure is basically a function bind with its lexical environment

// Closure :Function bundled with its lexical environment is known as a closure. Whenever function is returned, even if its vanished in execution context but still it remembers the reference it was pointing to. Its not just that function alone it returns but the entire closure.

const securedBooking = function () {
  let passengerCount = 0;
  return function () {
    console.log(`Passenger count ${passengerCount}`);
    passengerCount++;
  };
};

const booker = securedBooking();
booker();
booker();
booker();
booker();
// This property will help us to see the closure
console.dir(booker);
// A function always have access to variable env of the execution context where it was created even after the execution context is gone

// Some examples on closures to understand the concept better

// Example 1 : closure
let f;
const g = function () {
  const a = 2;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 3;
  f = function () {
    console.log(b * 2);
  };
};
g();
f(); // 4
// reassigning a function
h();
f(); // 6

// Closure example 2

// to create a timeout, we have a setTimeout function which takes in two parameters

// setTimeout(function () {
//   console.log('hello, i am a timer');
// }, 4000);

const boardingTime = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers now!!`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Boarding will start in ${wait} seconds`);
};

boardingTime(300, 3);
// closure also have priority over the scope chain

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
