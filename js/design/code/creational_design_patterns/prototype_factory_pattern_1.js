class Address {
    constructor(suite, streetAddress, city, country) {
        this.suite = suite;
        this.streetAddress = streetAddress;
        this.city = city;
        this.country = country;
    }

    toString() {
        return `Address: ${this.suite}, ${this.streetAddress}, ${this.city}, ${this.country}`;
    }
}

class Employee {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }

    toString() {
        return `Employee ${this.name} lives at ${this.address}`;
    }
}

// This is a deep copy
class Serializer {
    constructor(types) {
        this.types = types;
    }

    deleteRecursive(obj) {
        if (obj === null) {
            return;
        }
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
        if (obj === null) {
            return;
        }
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
        if (obj === null) {
            return;
        }
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


class EmployeeFactory {

    static _newEmployee(proto, name, suite) {
        let copy = EmployeeFactory.serializer.clone(proto);
        copy.name = name;
        copy.address.suite = suite;
        return copy;
    } 

    static newMainOfficeEmployee(name, suite) {
        return EmployeeFactory._newEmployee(EmployeeFactory.main, name, suite);
    }

    static newAuxOfficeEmployee(name, suite) {
        return EmployeeFactory._newEmployee(EmployeeFactory.aux, name, suite);
    }
}

// single serializer instance used throughout
EmployeeFactory.serializer = new Serializer([Employee, Address]);
// Prototype for Employees in main and auxiliary offices
EmployeeFactory.main = new Employee(null, 
    new Address(null, '123 London Road', 'London', 'UK'));
EmployeeFactory.aux = new Employee(null,
    new Address(null, '124 London Road', 'London', 'UK'));



const john = EmployeeFactory.newMainOfficeEmployee('John', 100);
const jane = EmployeeFactory.newAuxOfficeEmployee('Jane', 200);
console.log(john.toString());
console.log(jane.toString());
