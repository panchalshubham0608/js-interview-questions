# Debouncing
Debouncing is a programming practice used to prevent time-consuming operations from running so frequently that it slows down the speed of the web page. In simple words it limits the rate at which a function gets invoked. 

### Applications
- Debouncing can be used to implement suggestive text, in which case we wait a short while for the user to stop typing before offering the text. We wait a few seconds after each type before offering suggestions.
- Debouncing is also used in websites that load content while the user scrolls, like Facebook and Twitter. In these cases, the scroll event may have a negative performance impact if it is thrown too frequently because it contains a lot of movies and images. Therefore, debouncing must be used in the scroll event.

```javascript
// Attempt1: whenever you call the function just clear the existing timeout and set new timeout
function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(), delay);
    }
}
var sayHello = debounce(() => {
    console.log('Hello');
}, 2000);
for (let i = 0; i < 10; i++) {
    sayHello();
}



// Attemp2: Handling function arguments
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }
}
var sayHello = debounce((...args) => {
    console.log('Hello', ...args);
}, 2000)

for (let i = 0; i < 10; i++) {
    sayHello('user1', 'user2');
}


// Attemp3: Handling function context
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    }
}
var obj = {
    name: 'John',
    sayHello: debounce(function () {
        console.log('Hello', this.name);
    }, 2000)
}
for (let i = 0; i < 10; i++) {
    obj.sayHello();
}
```