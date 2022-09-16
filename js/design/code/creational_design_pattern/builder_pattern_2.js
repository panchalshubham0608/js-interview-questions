// Accepting soo many parameters in a constructor is not a good idea
// because it is hard to remember the order of the parameters
// and hard to provide default values for optional parameters
// This is where the builder pattern comes in
// The builder pattern is a creational design pattern that provides
// a flexible solution to various object creation problems in object-oriented programming
// The builder pattern is used to create complex objects with constituent parts that must be created in the same order or using a specific algorithm
// An external class controls the construction algorithm
class Person {
    constructor() {        
        // address
        this.streetAddress = this.postcode = this.city = '';

        // employment
        this.companyName = this.position = '';
        this.annualIncome = 0;
    }

    toString() {
        return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode} and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome}`;
    }
}

// ParentBuilder 
class PersonBuilder {
    constructor(person = new Person()) {
        this.person = person;
    }

    get lives() {
        return new PersonAddressBuilder(this.person)
    }

    get works() {
        return new PersonJobBuilder(this.person)
    }

    build() {
        return this.person;
    }

}

class PersonJobBuilder extends PersonBuilder {
    constructor(person) {
        super(person);        
    }

    at(companyName) {
        this.person.companyName = companyName;
        return this;
    }

    asA(position) {
        this.person.position = position;
        return this;
    }

    earning(annualIncome) {
        this.person.annualIncome = annualIncome;
        return this;
    }
}

class PersonAddressBuilder extends PersonBuilder {
    constructor(person) {
        super(person);
    }

    at(streetAddress) {
        this.person.streetAddress = streetAddress;
        return this;
    }

    withPostcode(postcode) {
        this.person.postcode = postcode;
        return this;
    }

    in(city) {
        this.person.city = city;
        return this;
    }
}


let pb = new PersonBuilder();
let person = pb.lives.at('123 London Road').in('London').withPostcode('SW12BC')
    .works.at('Fabrikam').asA('Engineer').earning(123000)
    .build();
console.log(person.toString());

