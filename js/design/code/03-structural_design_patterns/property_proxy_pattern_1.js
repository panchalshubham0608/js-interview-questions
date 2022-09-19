// Property Proxy

class Property {
    constructor(name='', value=''){
        this._value = value;
        this._name = name;
    } 

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value == value)   return;
        console.log(`Property ${this._name} has changed value from ${this._value} to ${value}`);
        this._value = value;
    }

}


class Creature {
    constructor() {
        this._agility = new Property('agility', 10);
    }

    get agility() {
        return this._agility.value
    }

    set agility(value) {
        this._agility.value = value;
    }
}

let c = new Creature();
c.agility = 10;
console.log(c);
c.agility = 11;
console.log(c);
