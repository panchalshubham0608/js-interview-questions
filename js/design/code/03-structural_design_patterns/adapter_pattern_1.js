// Adapter Pattern
// Adapter Pattern is a structural design pattern that allows 
// objects with incompatible interfaces to collaborate.
// The Adapter pattern converts the interface of a class into
// another interface the clients expect. Adapter lets classes
// work together that couldn't otherwise because of incompatible
// interfaces.

// The Adapter pattern is often used to make existing classes
// work with others without modifying their source code.


// Suppose we have a nice API to print a point on a 2D grid
// Suppose we have an API to draw points
const drawPoint = (grid, point) => {
    grid[point.x][point.y] = true;
}
// build the grid
function printGrid(grid) {
    let gridString = '';
    gridString += '  ';
    for (let i = 0; i < grid.length; i++){
        gridString += i.toString() + ' ';
    }
    for (let i = 0; i < grid.length; i++) {
        gridString += '\n';
        gridString += i.toString() + ' ';
        for (let j = 0; j < grid[i].length; j++) {
            gridString += grid[i][j] ? '.' : ' ' + ' ';
        }        
    }
    console.log(gridString);
}
const grid = [];
for (let i = 0; i < 10; i++) {
    grid.push(new Array(10).fill(false));
}





// Now suppose we have multiple geometrical shapes
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    toString() {
        return `${start}->${end}`
    }
}

class Rectangle {
    constructor(leftTop, rightBottom) {
        this.leftTop = leftTop;
        this.rightBottom = rightBottom;
    }

    toString() {
        return `${this.leftTop}->${this.rightBottom}`
    }
}

// Finds the hashcode for given string
String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
      return this.split("").reduce(function(a,b){
        a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }
    let hash = 0;
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
      const character = this.charCodeAt(i);
      hash  = ((hash<<5)-hash)+character;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
};

// Now we want to draw lines and rectangles
// We can't use the API to draw lines and rectangles
// because the API only accepts points
// We need to create an adapter to convert lines and rectangles
// into points
class LineToPointAdapter{

    static cache = {};

    constructor(line) {
        // check if the line is already in the cache
        let hash = JSON.stringify(line).hashCode();
        if (hash in LineToPointAdapter.cache) {
            this.points = LineToPointAdapter.cache[hash];
            return this;
        }

        // if not, create the points and add them to the cache
        console.log(`Generating points for line [${line.start.x}, ${line.start.y}]-[${line.end.x}, ${line.end.y}]`);
        const left = Math.min(line.start.x, line.end.x);
        const right = Math.max(line.start.x, line.end.x);
        this.points = [];

        // Interpolate points
        const slope = (line.end.y - line.start.y)/(line.end.x - line.start.x);
        const c = line.start.y - slope * line.start.x;
        for (let x = left; x <= right; x++) {
            const y = slope * x + c;
            this.points.push(new Point(x, y));
        }

        LineToPointAdapter.cache[hash] = this.points;
    }
}

let line1 = new Line(new Point(0, 0), new Point(9, 9));
let adapter = new LineToPointAdapter(line1);
console.log(JSON.stringify(adapter.points));
for (let p of adapter.points) {
    drawPoint(grid, p);
}
printGrid(grid);


let line2 = new Line(new Point(0, 0), new Point(9, 9));
let adapter2 = new LineToPointAdapter(line2);
console.log(JSON.stringify(adapter2.points));
