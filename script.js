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
const oneWord = function(word) {
    return word.replaceAll(" ","").toLowerCase();
}

// Another function responsible for taking the first word to uppercase
const upperCaseWord = function(word) {
    const arr = word.split(' ');
    const [firstWord, ...restWords] = arr;
    console.log(firstWord, restWords);
    const str =  [firstWord.toUpperCase(), ...restWords].join(' ')
    return str;
}
// Lets now create a high order function

const transformer = function(str, fn) {
console.log(`This is without transformed string : ${str}`);
console.log(`This is transformed string : ${fn(str)}`);
console.log(`This is transformed string : ${fn.name}`);
}

transformer('Javascript is a fun language 👍🏻', oneWord);
transformer('Javascript is a fun language 👍🏻', upperCaseWord);

// one eventlistner eg 
// js uses call back functions all the time

const high5 = function() {
  console.log('👋');
}

document.body.addEventListener('click',high5);

// The 2 main advantage of using callback or high order function is 
// 1. to have a cleaner and better code
// 2. to achieve abstraction

// High order functions : function returning a function

const greet = function(greet) {
  return function(name) {
    console.log( `${greet} ${name}`);
  }
}
const nameOfPerson = greet('Hello Good afternoon!!');
nameOfPerson('Anki');

// The above can be written as 

greet('Hello good morning')('anki');

// Challenge to write above method using arrow functions

const greetArrow = greet => name => console.log(`${greet} ${name}`);

greetArrow('Hello')('bni');


// The call and apply methods 