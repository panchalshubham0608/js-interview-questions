// Abstract Factory Pattern
// Abstract Factory Pattern is a creational design pattern that lets you produce families 
// of related objects without specifying their concrete classes.

// Heirarchy of classes
class HotDrink {
    constructor() {
        if (this.constructor.name === 'HotDrink') {
            throw new Error('This is an abstract class');
        }
    }
    consume() { /* abstract method */}
}

class Tea extends HotDrink {
    consume() {
        console.log(`This tea is nice with lemon!`);
    }
}

class Coffee extends HotDrink {
    consume() {
        console.log(`This coffee is delicious!`);
    }
}

// Another heirarchy of classes
class HotDrinkFactory {
    constructor() {
        if (this.constructor.name === 'HotDrinkFactory') {
            throw new Error('This is an abstract class');
        }
    }
    prepare(amount) { /* abstract method */}
}

class TeaFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Put in tea bag, boil water, pour ${amount} ml, add lemon, enjoy!`);
        return new Tea();
    }
}

class CoffeeFactory extends HotDrinkFactory {
    prepare(amount) {
        console.log(`Grind some beans, boil water, pour ${amount} ml, add cream and sugar, enjoy!`);
        return new Coffee();
    }
}


// put all factories in a single class
// To add a new factory, just add a new class and add it to the array
const AvailableDrinks = Object.freeze({
   coffee: CoffeeFactory,
   tea: TeaFactory 
});

// Abstract Factory
// This is the factory of factories
class HotDrinkMachine {
    // Here we violate the Open-Closed Principle
    // because we need to modify this class whenever we add a new drink
    // makeDrink(type) {
    //     switch(type) {
    //         case 'tea':
    //             return new TeaFactory().prepare(200);
    //         case 'coffee':
    //             return new CoffeeFactory().prepare(50);
    //     }
    // }

    // Here we use the Abstract Factory Pattern
    // We create a factory for each drink
    // and we put all factories in a single class
    makeDrink(type) {
        return new AvailableDrinks[type]().prepare(200);
    }
}


// const machine = new HotDrinkMachine();
// const tea = machine.makeDrink('tea');
// tea.consume();
// const coffee = machine.makeDrink('coffee');
// coffee.consume();


const machine = new HotDrinkMachine();
machine.makeDrink('tea').consume();
machine.makeDrink('coffee').consume();

