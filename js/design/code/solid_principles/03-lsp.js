// 3. Liskov Substitution Principle
// Objects in a program should be replaceable with instances of their subtypes
// without altering the correctness of that program.
// In other words, derived classes must be substitutable for their base classes.


class Rectangle {
    constructor(width, height) {
        this._width = width;
        this._height = height;
    }

    get area() {
        return this._width * this._height;
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

}

class Square extends Rectangle {
    constructor(size) {
        super(size, size);
    }

    // To enforce that the width and height are always the same
    // we can override the setter for the width property
    // and make it set both the width and height to the same value
    // The problem with this approach is that it breaks the Liskov Substitution Principle
    // because the Square class is no longer substitutable for the Rectangle class
    // because the Square class has a different behavior than the Rectangle class
    // when it comes to setting the width and height properties
    set width(value) {
        this._width = this._height = value;
    }
    set height(value) {
        this._width = this._height = value;
    }

    // We have to define the getters because 
    // the getters in the Rectangle class are not inherited
    // that's because the getters are defined using the Object.defineProperty method
    // and the Object.defineProperty method does not support inheritance
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}


// The Liskov Substitution Principle states that
// objects in a program should be replaceable with instances of their subtypes
// without altering the correctness of that program
// In other words, derived classes must be substitutable for their base classes
// This is a very important principle
// If you violate it, you will end up with a fragile (broken) base class
// and a lot of code that depends on it
// This is a very common problem in object-oriented programming
// and it is the reason why inheritance is often considered harmful
// Inheritance is a powerful tool
// But it is also a very dangerous one
function useIt(rc) {
    let width = rc.width;
    rc.height = 10;
    console.log(`Expected area of ${width * 10}, got ${rc.area}`);
}

let rc = new Rectangle(2, 3);
useIt(rc);
let sq = new Square(5);
useIt(sq);
