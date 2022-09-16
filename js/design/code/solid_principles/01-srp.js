// 1. Single Responsibility Principle
// A class should have only one reason to change.
// A class should have only one responsibility.

// Journal class has only one responsibility
// to maintain a list of entries
class Journal {
    static count = 0;
    constructor() {
        this.entries = {};
    }

    addEntry(text) {
        let c = ++Journal.count;
        let entry = `${c}: ${text}`;
        this.entries[c] = entry;
        return c;
    }

    removeEntry(index) {
        delete this.entries[index];
    }

    // here we break the SRP
    // because we are adding a new responsibility to the class
    // which is to save the journal to a file
    // this is not the responsibility of the journal class
    // so we need to create a new class for this
    // save(filename) { ... }
    // load(filename) { ... }
    // loadFromUrl(url) { ... }
}

// here we create a new class for the new responsibility
// which is to save the journal to a file
// this is the single responsibility of this class
class PersistenceManager {
    // pre-process the journal
    preprocess(j) {}

    // save the journal
    saveToFile(journal, filename) {}
}

let j = new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');
console.log(j);
j.removeEntry(1);
console.log(j);
