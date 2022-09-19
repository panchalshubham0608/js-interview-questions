// Implementation using Event Broker

class Event {
    constructor(name) {
        this.name = name
        this.handlers = new Map();
        this.count = 0;
    }

    subscribe(handler) {
        this.handlers.set(++this.count, handler);
        return this.count;
    }

    unsubscribe(id) {
        this.handlers.delete(id);
    }

    fire(sender, args) {
        this.handlers.forEach((handler) => {
            handler(sender, args);
        });
    }

    toString() {
        return `Event: ${this.name}`;
    }
}

class EventBroker {
    constructor() {
        this.events = new Map();
    }

    subscribe(eventName, handler) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Event(eventName));
        }
        return this.events.get(eventName).subscribe(handler);
    }

    unsubscribe(eventName, id) {
        if (!this.events.has(eventName)) {
            return;
        }
        this.events.get(eventName).unsubscribe(id);
    }

    fire(eventName, sender, args) {
        if (!this.events.has(eventName)) {
            return;
        }
        this.events.get(eventName).fire(sender, args);
    }
}

let whatToQuery = Object.freeze({
    attack: 1,
    defense: 2
});


class Query {
    constructor(creatureName, whatToQuery, defaultValue) {
        this.creatureName = creatureName;
        this.whatToQuery = whatToQuery;
        this.defaultValue = defaultValue;
    }

    toString() {
        return `Query: ${this.creatureName} wants to know ${this.whatToQuery}`;
    }
}

class Creature {
    constructor(eventBroker, name, attack, defense) {
        this.eventBroker = eventBroker;
        this.name = name;
        this.initialAttack = attack;
        this.initialDefense = defense;
    }

    get attack() {
        let q = new Query(this.name, whatToQuery.attack, this.initialAttack);
        this.eventBroker.fire('Query', this, q);
        return q.defaultValue;
    }

    get defense() {
        let q = new Query(this.name, whatToQuery.defense, this.initialDefense);
        this.eventBroker.fire('Query', this, q);
        return q.defaultValue;        
    }

    toString() {
        return `name: ${this.name}, attack: ${this.attack}, defense: ${this.defense}`;
    }
}


class CreatureModifier {
    constructor(eventBroker, creature) {
        this.eventBroker = eventBroker;
        this.creature = creature;
        this.token = eventBroker.subscribe('Query', this.handle.bind(this));
    }

    handle(sender, query) { /* abstract */ }

    close() {
        this.eventBroker.unsubscribe('Query', this.token);
    }
}

class DoubleAttackModifier extends CreatureModifier {
    constructor(eventBroker, creature) {
        super(eventBroker, creature);
    }

    handle(sender, query) {
        if (sender.name === this.creature.name && query.whatToQuery === whatToQuery.attack) {
            query.defaultValue *= 2;
        }
    }
}

class IncreaseDefenseModifier extends CreatureModifier {
    constructor(eventBroker, creature) {
        super(eventBroker, creature);
    }

    handle(sender, query) {
        if (sender.name === this.creature.name && query.whatToQuery === whatToQuery.defense) {
            query.defaultValue += 1;
        }
    }
}


class NoBonusesModifier extends CreatureModifier {
    constructor(eventBroker, creature) {
        super(eventBroker, creature);
    }

    handle(sender, query) {
        if (sender.name === this.creature.name) {
            query.defaultValue = 0;
        }
    }
}


let eventBroker = new EventBroker();
let goblin = new Creature(eventBroker, 'Strong Goblin', 2, 2);
console.log(goblin.toString());

let root = new CreatureModifier(eventBroker, goblin);
console.log(`Let's double ${goblin.name}'s attack`);
let doubleAttack = new DoubleAttackModifier(eventBroker, goblin);
console.log(goblin.toString());

console.log(`Let's increase ${goblin.name}'s defense`);
let increaseDefense = new IncreaseDefenseModifier(eventBroker, goblin);
console.log(goblin.toString());
