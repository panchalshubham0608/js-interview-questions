// Decorator Pattern
// Decorator Pattern is a structural design pattern that allows 
// adding new behaviors to objects by placing these objects inside 
// special wrapper objects that contain the behaviors.

class Shape {}
class Cirlce extends Shape {
    constructor(radius) { 
        super();
        this.radius = radius;
    }
    resize(factor) { this.radius *= factor; }
    toString() { return `A circle with radius ${this.radius}`; } 
}

// Now suppose we want to add a new behavior to the circle class
// We can do this by wrapping the circle object inside a decorator
class ColoredShape {
    constructor(shape, color) {
        this.shape = shape;
        this.color = color;
    }

    toString() {
        return `${this.shape.toString()} has the color ${this.color}`;
    }
}

class TransparentShape {
    constructor(shape, transparency) {
        this.shape = shape;
        this.transparency = transparency;
    }

    toString() {
        return `${this.shape.toString()} has ${this.transparency * 100.0}% transparency`;
    }
}


let circle = new Cirlce(10);
console.log(circle.toString());

let redCircle = new ColoredShape(circle, 'red');
console.log(redCircle.toString());
// After decorating we have lost the resize method
// redCircle.resize(2);

let redHalfTransparentCircle = new TransparentShape(redCircle, 0.5);
console.log(redHalfTransparentCircle.toString());

