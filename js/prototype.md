# What are object prototype?
- Prototypes are the mechanism by which JavaScript objects inherit features from one another. 
- Every object in JavaScript has a built-in property, which is called its prototype
- When you try to access a property of an object: if the property can't be found in the object itself, the prototype is searched for the property


```javascript
Array.prototype.sum = function () {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
        sum += this[i];
    }
    return sum;
}
console.log([1, 2, 3].sum()); // 6
```