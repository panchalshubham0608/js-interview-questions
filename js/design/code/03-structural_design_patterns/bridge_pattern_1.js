// Bridge Pattern
// Bridge Pattern is a structural design pattern that lets you 
// split a large class or a set of closely related classes into 
// two separate hierarchies—abstraction and implementation—which can be developed 
// independently of each other.

// The Bridge pattern is often used when you need to extend a class in several
// orthogonal (independent) dimensions. In such cases, the class inheritance
// hierarchy becomes impractical, and the alternative is to compose the class
// from separate parts.

// The Bridge pattern lets you combine the different dimensions of your class
// into separate class hierarchies. The original class can then link to one of
// the resulting hierarchies, which lets you independently vary its interface,
// its implementation, or both.

// The Bridge pattern is also known as the Handle/Body pattern.



// // Abstraction
// class Renderer { /* abstract class */ }
// class VectorRenderer extends Renderer { }
// class RasterRenderer extends Renderer { }

// Implementation
// class Shape { /* abstract class */ }
// class Circle extends Shape { }
// class Square extends Shape { }

// Here we have two hierarchies: Shape and Renderer.
// Shape - Circle, Square
// Renderer - VectorRenderer, RasterRenderer
// We can combine them in different ways:
// CircleVectorRenderer, CircleRasterRenderer, SquareVectorRenderer, SquareRasterRenderer
// This is called cartesian state explosion.
class CircleVectorRenderer extends Circle { /* ... */ }
class CircleRasterRenderer extends Circle { /* ... */ }
class SquareVectorRenderer extends Square { /* ... */ }
class SquareRasterRenderer extends Square { /* ... */ }



// We can use the Bridge Pattern to solve this problem.
// We can create a new class called ShapeRendererBridge
// and move the Renderer class to it.
// Now we have two hierarchies: Shape and ShapeRendererBridge.
// Shape - Circle, Square
// ShapeRendererBridge - Renderer
// We can combine them in different ways:
// CircleRenderer, SquareRenderer


// Abstraction
// The Renderer class can be used in the Shape class.
// and can be developed independently of the Shape class.
class Renderer { 
    /* abstract class */
    renderCircle(radius) { /* abstract method */ }
    renderSquare(size) { /* abstract method */ }
}
// The logic to render a circle or a square is now in the Renderer class.
class VectorRenderer extends Renderer { /* ... */}
class RasterRenderer extends Renderer { /* ... */}


// Implementation
// The Shape class can be developed independently of the Renderer class.
class Shape { 
    constructor(render){ /* ... */ }
}
class Circle extends Shape {
    constructor(render, radius) { /* ... */ }
    draw() { /* ... */ }
}
class Square extends Shape {
    constructor(render, size) { /* ... */ }
    draw() { /* ... */ }
}

