// generator function
const fibonacciGeneratorFunc = function* () {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

// get the generator object
const fibonacci = fibonacciGeneratorFunc();
console.log(fibonacci); // Object [Generator] {}

// infinite stream
console.log(fibonacci.next().value); // 1
console.log(fibonacci.next().value); // 2
console.log(fibonacci.next().value); // 3
console.log(fibonacci.next().value); // 5
console.log(fibonacci.next().value); // 8
console.log(fibonacci.next().value); // 13