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
vistara.buyPlane = function() {
  console.log(this);
  this.planes++;
  console.log(this.planes)
}

const element = document.querySelector('.buy');
element.addEventListener('click', vistara.buyPlane.bind(vistara));
console.log(vistara);
// Here in this case this points to element so when we do ++ it return nan This keyword when attached to eventListener method then it points to the element on which eventListner is added

// Another example using partial application
// so what we have in here ?? We simply created a function taxCalculator now say for India tax this year is 20 so we want create a function keeping this value as default

const taxCalculator = (tax, amount) => {
return amount + amount*tax;
}
const taxCalculatorIndia = taxCalculator.bind(null,  20);

console.log(taxCalculatorIndia(100));

// Now one might think we could have done it via default parameter but here in this case we r creating a new method itself what if you want to create another method for vietnam where tax = 0.13 so via default we had to pass this paramter but if create a new method out of generic method it is much better 

const taxCalculatorSpain = taxCalculator.bind(null, 0.13);
console.log(taxCalculatorSpain(1339));

// Reframe this method to create above scenario

const taxCal = function(tax) {
  return function(amount) {
    return amount + amount*tax;
  }
}

const val = taxCal(0.1);
console.log(val(100));