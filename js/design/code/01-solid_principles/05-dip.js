// 5. Dependency Inversion Principle
// Depend upon abstractions. Do not depend upon concrete classes.

// The Dependency Inversion Principle states that
// high-level modules should not depend on low-level modules
// both should depend on abstractions
// abstractions should not depend on details
// details should depend on abstractions

// The Dependency Inversion Principle is a way to decouple your code
// It is a way to make your code more flexible and maintainable

const Relationship = Object.freeze({
    parent: 0,
    child: 1,
    sibling: 2
});

class Person {
    constructor(name) {
        this.name = name;
    }
}

// // low-level module
// class Relationships {
//     constructor() {
//         this.data = [];
//     }

//     addParentAndChild(parent, child) {
//         this.data.push({
//             from: parent,
//             type: Relationship.parent,
//             to: child
//         });
//     }
// }

// // high-level module
// class Research {
//     constructor(relationships) {

//         // find all children of John
//         // Here we are directly depending on the low-level module
//         // This is not good because if we change the low-level module
//         // then we will have to change the high-level module as well
//         let relations = relationships.data;
//         for (let rel of relations.filter(
//             r =>
//                 r.from.name === 'John' &&
//                 r.type === Relationship.parent
//         )) {
//             console.log(`John has a child named ${rel.to.name}`);
//         }
//     }
// }


// let parent = new Person('John');
// let child1 = new Person('Chris');
// let child2 = new Person('Matt');

// // low-level module
// let rels = new Relationships();
// rels.addParentAndChild(parent, child1);
// rels.addParentAndChild(parent, child2);

// new Research(rels);




// Good example of Dependency Inversion Principle
class RelationshipBrowser {
    constructor() {
        if (this.constructor.name === 'RelationshipBrowser')
            throw new Error('RelationshipBrowser is abstract!');
    }

    findAllChildrenOf(name) {}
}

// low-level module
class Relationships extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child
        });
    }

    findAllChildrenOf(name) {
        return this.data.filter(r =>
            r.from.name === name &&
            r.type === Relationship.parent
        ).map(r => r.to);
    }
}

// high-level module
class Research {
    constructor(browser) {
        // find all children of John
        // Here we are not directly depending on the low-level module
        // We are depending on an abstraction
        // So if we change the low-level module
        // then we will not have to change the high-level module
        for (let p of browser.findAllChildrenOf('John')) {
            console.log(`John has a child named ${p.name}`);
        }
    }
}


let parent = new Person('John');
let child1 = new Person('Chris');
let child2 = new Person('Matt');

// low-level module
let rels = new Relationships();
rels.addParentAndChild(parent, child1)
rels.addParentAndChild(parent, child2)

new Research(rels);

