# Currying in JavaScript
Currying is an advanced technique to transform a function of n arguments, to n functions of one or fewer arguments.

```javascript
// Function with two arguments
function add(a, b) {
   return a + b;
}
 
// Currying: Tranform a function with two arguments into two functions with one argument. By using the currying technique, we do not change the functionality of a function, we just change the way it is invoked.
function curriedAdd (a) {
   return function(b){
     return a + b;
   }
}
 
console.log(add(1, 2)); // 3
console.log(curriedAdd(1)(2)); // 3
```