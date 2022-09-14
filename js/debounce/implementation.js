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
