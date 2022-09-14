# Closure in JavaScript
A closure is created when a child function keeps the environment of the parent scope even after the parent function has already executed.

```javascript
const add = function(){
   let counter = 0;
   return function(){
       counter++;
       return counter;
   }
}()
 
console.log(add());
console.log(add());
console.log(add());
```
