// Chain of Responsibility Pattern
// Chain of Responsibility pattern is a behavioral design pattern that 
// allows passing a request along a chain of potential handlers until one of them handles it.
// The Chain of Responsibility pattern is a design pattern consisting of a source of command
// objects and a series of processing objects. Each processing object contains logic that
// defines the types of command objects that it can handle; the rest are passed to the next
// processing object in the chain. A mechanism also exists for adding new processing objects
// to the end of this chain.

// The Chain of Responsibility pattern is implemented with linked list of handlers. Each
// handler knows only about its successor, but not about its predecessors. To send a request
// to a chain, the client code usually creates a chain beforehand and then sends the request
// to the head of the chain.

// The Chain of Responsibility pattern is similar to the Composite pattern. Both patterns
// consist of objects that form a tree-like structure. However, there are some differences
// between them. The Composite pattern lets clients treat both simple and complex elements
// uniformly. The Chain of Responsibility pattern, on the other hand, lets clients pass a
// request along a chain of potential handlers. Moreover, the Composite pattern usually
// has one root of the tree, while the Chain of Responsibility pattern can have a whole
// forest of roots. Finally, the Composite pattern focuses on processing a request in a
// particular way, while the Chain of Responsibility pattern focuses on processing a request
// in a particular order.

// The Chain of Responsibility pattern is often used in event handling systems. For example,
// a widget might have a parent widget and a child widget. When an event occurs on the
// child widget, the child widget can pass the event to its parent widget. The parent widget
// can then pass the event to its parent widget, and so on, until the event reaches the root
// of the widget tree. The root widget can handle the event or pass it along the tree.

// The Chain of Responsibility pattern is also used in the middleware of web frameworks.
// For example, a web framework might have a middleware that checks if a user is logged in.
// If the user is logged in, the middleware can pass the request to the next middleware in
// the chain. If the user is not logged in, the middleware can redirect the request to the
// login page. The next middleware in the chain can then check if the user is logged in
// again. If the user is logged in, the request can be processed. If the user is not logged
// in, the middleware can redirect the request to the login page again. This process can
// continue until the request is processed or the maximum number of redirects is reached.

// The Chain of Responsibility pattern is also used in the Command pattern. The Command
// pattern uses the Chain of Responsibility pattern to implement undo/redo functionality.
// The Command pattern can also use the Composite pattern to implement macros. A macro
// is a sequence of commands that can be treated as a single command. The Command pattern
// can use the Chain of Responsibility pattern to implement a macro. The macro can be
// treated as a single command, which can be passed to the first handler in the chain.
// The first handler can then pass the command to the next handler in the chain, and so on,
// until the command reaches the last handler in the chain. The last handler can then
// execute the command.

// The Chain of Responsibility pattern is also used in the Observer pattern. The Observer
// pattern uses the Chain of Responsibility pattern to implement event propagation. When
// an event occurs, the event propagates through the widget tree. Each widget can handle
// the event or pass it to its parent widget. This process can continue until the event
// reaches the root of the widget tree. The root widget can handle the event or pass it
// along the tree.

// The Chain of Responsibility pattern is also used in the Interpreter pattern. The Interpreter
// pattern uses the Chain of Responsibility pattern to implement the parsing of expressions.
// The Interpreter pattern can use the Composite pattern to implement the parsing of
// expressions. The Interpreter pattern can use the Chain of Responsibility pattern to
// implement the parsing of expressions. 

class Creature {
    constructor(name, attack, defense) {
        this.name = name;
        this.attack = attack;
        this.defense = defense;
    }
    
    toString() {
        return `name: ${this.name}, attack: ${this.attack}, defense: ${this.defense}`;
    }
}

class CreatureModifier {
    constructor(creature) {
        this.creature = creature;
        // LinkedList: link to the next modifier
        this.nextModifier = null;
    }

    add(modifier) {
        if (this.nextModifier) {
            this.nextModifier.add(modifier);
        } else {
            this.nextModifier = modifier;
        }
    }

    handle() {
        if (this.nextModifier) {
            this.nextModifier.handle();
        }
    }
}

class DoubleAttackModifier extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle() {
        console.log(`Doubling ${this.creature.name}'s attack`);
        this.creature.attack *= 2;
        super.handle();
    }
}

class IncreaseDefenseModifier extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle(){
        if (this.creature.attack <= 2){
            console.log(`Increasing ${this.creature.name}'s defense value`);
            this.creature.defense++;
        }
        super.handle();
    }
}

class NoBonusModifier extends CreatureModifier {
    constructor(creature) {
        super(creature);
    }

    handle(){
        console.log('No bonus for you!');
    }
}

let goblin = new Creature('Goblin', 1, 1);
console.log(goblin.toString());

let root = new CreatureModifier(goblin);
root.add(new NoBonusModifier(goblin));
root.add(new DoubleAttackModifier(goblin));
root.add(new IncreaseDefenseModifier(goblin));
root.add(new IncreaseDefenseModifier(goblin));
root.add(new DoubleAttackModifier(goblin));
root.add(new IncreaseDefenseModifier(goblin));

root.handle();
console.log(goblin.toString());
