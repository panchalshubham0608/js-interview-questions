// Singleton Pattern
// Singleton Pattern is a creational design pattern that lets you ensure 
// that a class has only one instance, while providing a global access point to this instance.
// The Singleton Pattern is a design pattern that restricts the instantiation of a class to one object.
// This is useful when exactly one object is needed to coordinate actions across the system.
// The Singleton Pattern is used in situations where it is important to have only one instance of a class.
// For example a class that controls access to a shared resource such as a database or a file.
// or a class that coordinates actions across the system.

class Singleton {
    // The Singleton's constructor should always be private to 
    // prevent direct construction calls with the `new` operator.
    // And we provide a static getInstance() method to access the only instance
    // But this is not possible in JavaScript.
    // So we will use a variable to keep track of the Singleton's instance.
    constructor() {
        let instance = this.constructor.instance;
        if (instance) {
            return instance;
        }
        this.constructor.instance = this;
    }
}

let s1 = new Singleton();
let s2 = new Singleton();
console.log('Are identical? ' + (s1 === s2));




// Another approach to implement Singleton Design pattern 
// is to use class variables and methods.
class ChiefExecutiveOfficer {

    get name() { return ChiefExecutiveOfficer._name; }
    set name(value) { ChiefExecutiveOfficer._name = value; }
    
    get age() { return ChiefExecutiveOfficer._age; }
    set age(value) { ChiefExecutiveOfficer._age = value; }
}
ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

let ceo1 = new ChiefExecutiveOfficer();
ceo1.name = 'Adam Smith';
ceo1.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
console.log(ceo2.name);
console.log(ceo2.age);
