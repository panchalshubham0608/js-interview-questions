// Factory Design Pattern
// A factory is an object for creating other objects 
// formally a factory is a function or method that returns objects 
// of a varying prototype or class from some method call, which is assumed to be "new".
// The factory pattern is used to replace class constructors,
// abstracting the process of object generation so that the 
// type of the object instantiated can be determined at run-time.
// The factory pattern is used to create objects without having to 
// specify the exact class of the object that will be created.
// This allows the decoupling of code that uses the objects from the code that
// creates the objects.
// The factory pattern is also known as the virtual constructor.

// Factory Design Pattern

const CoordinateSystem = Object.freeze({
    CARTESIAN: 0,
    POLAR: 1    
});

class Point {

    // Here we violate the open-closed principle
    // because if we want to add a new coordinate system
    // we have to modify the constructor
    // Also the parameter names does not give us hint
    // about what is x or y; or rho or theta
    // constructor(a, b, cs = CoordinateSystem.CARTESIAN) {
    //     switch (cs) {
    //         case CoordinateSystem.CARTESIAN:
    //             this.x = a;
    //             this.y = b;
    //             break;
    //         case CoordinateSystem.POLAR:
    //             this.x = a * Math.cos(b);
    //             this.y = a * Math.sin(b);
    //             break;
    //     }
    // }


    // First of all you cannot have two constructors 
    // (or at least two constructors with same number of parameters)
    // Logically we should have this functionality where we can create Point object
    // using different coordinate systems
    // constructor(x, y) {
    //     this.x = x;
    //     this.y = y;
    // }

    // constructor(rho, theta) {
    //     this.x = rho * Math.cos(theta);
    //     this.y = rho * Math.sin(theta);
    // }



    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Factory methods: virtual constructor
    // A factort method is a static method that creates objects
    // With these methods we have clearity about the parameters at least
    // But here we violate the single responsibility principle
    // because Point is responsible for creating new Point objects
    // instead we should have a separate class for this
    static newCartesianPoint(x, y) {
        return new Point(x, y);
    }
    static newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }


    // To make your API more fluent you can use the provide a getter for PointFactory
    // Point.factory.newCartesianPoint(2, 3);
    // Point.factory.newPolarPoint(5, Math.PI / 2);
    static get factory() {
        // Again it's your choice whether to return a new instance or the same instance
        return new PointFactory();
    }
}

// Factory Design Pattern
// A factory is responsible solely for the wholesale (not piecewise) creation of objects.
// A factory is any function or method that returns objects of a varying prototype or class
class PointFactory{
    // You can decide to make factory methods static
    // It's up to you
    newCartesianPoint(x, y) {
        return new Point(x, y);
    }
    newPolarPoint(rho, theta) {
        return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
    }
}


// Bad object creation
let p1 = new Point(2, 3, CoordinateSystem.CARTESIAN);
console.log(p1);

let p2 = Point.newCartesianPoint(2, 3);
console.log(p2);
let p3 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p3);


// Good object creation
let pf = new PointFactory();
let p4 = pf.newCartesianPoint(2, 3);
console.log(p4);
let p5 = pf.newPolarPoint(5, Math.PI / 2);
console.log(p5);
