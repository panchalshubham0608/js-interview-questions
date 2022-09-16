function Pizza(name, price) {
    this.name = name;
    this.price = price;
}

function WithCheese(pizza, price) {
    return {
        ...pizza,
        cheese: true,
        price: pizza.price + price
    }
}

function WithPepperoni(pizza, price) {
    return {
        ...pizza,
        pepperoni: true,
        price: pizza.price + price
    }
}

function WithMushrooms(pizza, price) {
    return {
        ...pizza,
        mushrooms: true,
        price: pizza.price + price
    }
}

function WithSausage(pizza, price) {
    return {
        ...pizza,
        sausage: true,
        price: pizza.price + price
    }
}

let pizza = new Pizza('Pizza', 10);
let pizzaWithCheese = new WithCheese(pizza, 2);
let pizzaWithPepperoni = new WithPepperoni(pizza, 3);
let pizzaWithMushrooms = new WithMushrooms(pizza, 2);
let pizzaWithSausage = new WithSausage(pizza, 3);

console.log(pizzaWithCheese);
console.log(pizzaWithPepperoni);
console.log(pizzaWithMushrooms);
console.log(pizzaWithSausage);

let pizzaWithCheeseAndPepperoni = new WithPepperoni(pizzaWithCheese, 3);
let pizzaWithCheeseAndMushrooms = new WithMushrooms(pizzaWithCheese, 2);
let pizzaWithCheeseAndSausage = new WithSausage(pizzaWithCheese, 3);
console.log(pizzaWithCheeseAndPepperoni);
console.log(pizzaWithCheeseAndMushrooms);
console.log(pizzaWithCheeseAndSausage);
