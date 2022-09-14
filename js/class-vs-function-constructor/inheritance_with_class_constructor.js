class Person {
    constructor(name) {
        this.name = name;
    }
}

class Student extends Person {
    constructor(name, studentId) {
        super(name);
        this.studentId = studentId;
    }
}

Student.prototype.sayHello = function () {
    console.log(`Hello, my name is ${this.name} and my student ID is ${this.studentId}`);
}

const student = new Student('John', 123);
console.log(student);
student.sayHello();

   // new Person('John').sayHello(); // TypeError: (intermediate value).sayHello is not a function
