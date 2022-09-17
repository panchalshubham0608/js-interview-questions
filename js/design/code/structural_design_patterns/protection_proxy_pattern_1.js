class Car {

    drive() {
        console.log(`Car is being driven`);
    }
}

class ProtectedCard {
    constructor(driver) {
        this.driver = driver;
        this._car = new Car();
    }

    drive() {
        if (this.drive.age >= 16) {
            this._car.drive();
        } else {
            console.log(`Driver too young`);
        }
    }
}

class Driver {
    constructor(age) {
        this.age = age;
    }
}


let d = new Driver(12);
let p = new ProtectedCard(d);
p.drive();
