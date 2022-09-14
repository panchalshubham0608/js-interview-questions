# Generator Functions
A generator function is a normal function except that it can be paused and resumed and can yield multiple values. A generator function returns an iterable Generator object

### Benefits of generator functions
- They are memory efficient as lazy evaluation takes place meaning that they only generate the next element when requested.
- Generator function has the ability to work with infinite data streams and collections. For example we can implement infinite scroll or operate a sound wave using generator functions effectively!

```javascript
function* generator() {
 // yield a value
 yield 1;
 // yield all values from iterator one by one
 yield* [2, 3];
 // yield a value
 yield 4
 
 // return a value
 return 5;
}
 
const iterator = generator();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```