class CodeBuilder {
    constructor(className) {
        this.className = className;
        this.fields = [];
    }

    addField(name) {
        this.fields.push(name);
        return this;
    }

    toString() {
        let result = `class ${this.className} {\n`;
        if (this.fields.length > 0) {
            result += ' '.repeat(2) + 'constructor(';
            for (let idx = 0; idx < this.fields.length; idx++) {
                result += this.fields[idx];
                if (idx !== this.fields.length - 1)
                    result += ', ';
            }
            result += ') {\n';
            for (let field of this.fields) {
                result += ' '.repeat(4) + `this.${field} = ${field};\n`;
            }
            result += ' '.repeat(2) + '}\n';

        }
        result += `}`;
        return result;

    }
}

let cb = new CodeBuilder('Person').addField('name').addField('age');
console.log(cb.toString());

// Output:
// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
