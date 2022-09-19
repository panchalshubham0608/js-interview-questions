// Composite Pattern
// Composite Pattern is a structural design pattern that lets you 
// compose objects into tree structures and then work with these structures 
// as if they were individual objects.

class GraphicalObject {
    constructor(name = 'Group-' + (GraphicalObject.count++)) {
        this.children = [];
        this.color = undefined;
        this.name = name;
    }

    print(buffer, depth) {
        buffer.push('*'.repeat(depth));
        if (depth > 0)
            buffer.push(' ');
        if (this.color)
            buffer.push(this.color + ' ');
        buffer.push(this.name);
        buffer.push('\n');

        for (let child of this.children)
            child.print(buffer, depth + 1);
    }

    toString() {
        let buffer = [];
        this.print(buffer, 0);
        return buffer.join('');
    }
}
GraphicalObject.count = 0;

class Circle extends GraphicalObject {
    constructor(color) {
        super('Circle');
        this.color = color;
    }

    toString() {
        return `${this.color} ${this.name}`;
    }
}

class Square extends GraphicalObject {
    constructor(color) {
        super('Square');
        this.color = color;
    }

    toString() {
        return `${this.color} ${this.name}`;
    }
}

let drawing = new GraphicalObject();
drawing.children.push(new Square('Red'));
drawing.children.push(new Circle('Yellow'));

let group = new GraphicalObject();
group.children.push(new Circle('Blue'));
group.children.push(new Square('Blue'));

drawing.children.push(group);

console.log(drawing.toString());
