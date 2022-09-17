// Builder pattern is used to create complex objects with constituent parts 
// that must be created in the same order or using a specific algorithm. 
// An external class controls the construction algorithm.


// Bad example of building HTML
let items = ['one', 'two', 'three'];
let html = '<ul>\n';
for (var i = 0; i < items.length; i++) {
    html += ' <li>' + items[i] + '</li>\n';
}
html += '</ul>';
console.log(html);

// Good example of building HTML
class HtmlTag {
    
    static get indentSize() { return 2; }

    constructor(name, text) {
        this.name = name;
        this.text = text;
        this.children = [];
    }

    toStringIndented(indent) {
        let html = [];
        let i = ' '.repeat(indent * HtmlTag.indentSize);
        html.push(`${i}<${this.name}>\n`);
        if (this.text && this.text.length > 0) {
            html.push(' '.repeat(HtmlTag.indentSize * (indent + 1)));
            html.push(this.text);
            html.push('\n');
        }

        for (let child of this.children)
            html.push(child.toStringIndented(indent + 1));

        html.push(`${i}</${this.name}>\n`);
        return html.join('');
    }

    toString() {
        return this.toStringIndented(0);
    }
}

class HtmlBuilder {
    constructor(rootName) {
        this.root = new HtmlTag(rootName);
        this.rootName = rootName;
    }

    addChild(childName, childText) {
        let child = new HtmlTag(childName, childText);
        this.root.children.push(child);
        return this;
    }

    toString() {
        return this.root.toString();
    }

    clear() {
        this.root = new HtmlTag(this.rootName);
    }
}

let builder = new HtmlBuilder('ul');
builder.addChild('li', 'one').addChild('li', 'two');
console.log(builder.toString());
