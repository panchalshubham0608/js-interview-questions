// Prototype Pattern
// Prototype pattern is a creational design pattern
// that lets you copy existing objects without making your code dependent on their classes.
// Prototype pattern is used when the type of objects to create is determined by a prototypical instance,
// which is cloned to produce new objects.
// This pattern is used to:
// - avoid subclasses of an object creator in the client application, like the factory method pattern does.

// A prototype is an instance of a class
// The prototype pattern is used to instantiate a new object by copying all of the properties of an existing object,
// creating an independent clone. This practise is particularly useful when the construction of a new object is inefficient.
// For example, an object is to be created after a costly database operation.
// We can cache the object, returns its clone on next request and update the database 
// as and when needed thus reducing database calls.

class Address {
    constructor(streetAddress, city, country) {
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    toString() {
        return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
    }
}

class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    toString() {
        return `Person ${this.name} lives at ${this.address}`;
    }
}


const john = new Person('John', new Address('123 London Road', 'London', 'UK'));

// jane has same address as john, so why create a new address object?
// const jane = new Person('Jane', new Address('123 London Road', 'London', 'UK'));

// This is not a clone, it is a reference to the same object
// const jane = john;
// jane.name = 'Jane';
// console.log(john.toString());
// console.log(jane.toString());

// This is a shallow copy, it copies the reference to the address object
// However it does not copy the toString method
// const jane = {...john};
// jane.name = 'Jane';
// jane.address.streetAddress = '124 London Road';
// console.log(john);
// console.log(jane);
// console.log(john.toString());
// console.log(jane.toString());


// This is also a shallow copy, it only copies the reference to the address object
// However it does copies the function toString() as well
// const jane = Object.create(john);
// jane.name = 'Jane';
// jane.address.streetAddress = '124 London Road';
// console.log(john.toString());
// console.log(jane.toString());

// This is also a shallow copy, it only copies the reference to the address object
// const jane = Object.assign({}, john);
// jane.name = 'Jane';
// console.log(john);
// console.log(jane);
// console.log(john.toString());
// console.log(jane.toString());
// jane.address.streetAddress = '124 London Road';
// console.log(john);
// console.log(jane);

// We need a way to deep copy the object
// We can add a method `.clone()` to the Person class to do this
// Then we will have to add a new method `.clone()` to the Address class also
// And if we have a bigger chain where an object uses another object
// This will become cumbersome as we will have to implement 
// .clone() for every object and incorporate it in the .clone() method of the parent object


// One approach is to serialize and deserialize the object
// In this way we can get the deep copy of the object
// However the prototype chain is lost in this process
// We no longer have `toString()` method in the object
// const jane = JSON.parse(JSON.stringify(john));
// jane.name = 'Jane';
// jane.address.streetAddress = '124 London Road';
// console.log(john);
// console.log(jane);
// console.log(john.toString());
// console.log(jane.toString());


// This is a deep copy
class Serializer {
    constructor(types) {
        this.types = types;
    }

    deleteRecursive(obj) {
        if (obj.hasOwnProperty('typeIndex')) {
            delete obj.typeIndex;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                this.deleteRecursive(obj[key]);
            }
        }
    }

    markRecursive(obj) {
        // find the object in the types array
        let idx = this.types.findIndex(t => t === obj.constructor);
        if (idx !== -1) {
            obj['typeIndex'] = idx;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                this.markRecursive(obj[key]);
            }
        }
    }

    restoreRecursive(obj) {
        if (obj.hasOwnProperty('typeIndex')) {
            obj.__proto__ = this.types[obj.typeIndex].prototype;
            delete obj.typeIndex;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && typeof obj[key] === 'object') {
                this.restoreRecursive(obj[key]);
            }
        }
    }

    clone(obj) {
        this.markRecursive(obj);
        let copy = JSON.parse(JSON.stringify(obj));
        this.deleteRecursive(obj);
        this.restoreRecursive(copy);
        return copy;
    }
}

const serializer = new Serializer([Person, Address]);
const jane = serializer.clone(john);
jane.name = 'Jane';
jane.address.streetAddress = '124 London Road';
console.log(john);
console.log(jane);
console.log(john.toString());
console.log(jane.toString());
