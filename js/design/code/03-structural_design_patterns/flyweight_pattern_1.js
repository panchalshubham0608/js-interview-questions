// Flyweight Pattern
// This pattern is used to reduce the memory usage or computational expenses 
// by sharing as much as possible with similar objects
// 


class FormattedText {
    constructor(plainText) {
        this.plainText = plainText;
        this.caps = new Array(plainText.length).fill(false);
    }

    capitalize(start, end) {
        for (let i = start; i <= end; i++)
            this.caps[i] = true;
    }

    toString() {
        let buffer = [];
        for (let i in this.plainText) {
            let c = this.plainText[i];
            buffer.push(this.caps[i] ? c.toUpperCase() : c);
        }
        return buffer.join('');
    }
}

class TextRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.capitalize = false;
    }

    between(value) {
        return (this.start <= value && value <= this.end);
    }
}

class BetterFormattedText {
    constructor(plainText) {
        this.plainText = plainText;
        this.formatting = [];
    }

    getRange(start, end) {
        let range = new TextRange(start, end);
        this.formatting.push(range);
        return range;
    }

    toString() {
        let buffer = [];
        for (let i in this.plainText) {
            let c = this.plainText[i];
            for (let range of this.formatting)
                if (range.between(i) && range.capitalize)
                    c = c.toUpperCase();
            buffer.push(c);
        }
        return buffer.join('');
    }
}

let text = new FormattedText('This is a brave new world');
text.capitalize(10, 15);
console.log(text.toString());

let bft = new BetterFormattedText('Make America Great Again');
bft.getRange(0, 4).capitalize = true;
console.log(bft.toString());
