// The way inheritance works in JavaScript with function constructors
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function () {
    console.log("Hello, my name is " + this.name);
}

function Student(name, studentId) {
    Person.call(this, name);
    this.studentId = studentId;
}
Student.prototype.logStudentId = function () {
    console.log("My student ID is " + this.studentId);
}


let p1 = new Person("John");
console.log(p1);
p1.greet();

let s1 = new Student("Jane", 123);
console.log(s1);
s1.logStudentId();
// greet is not associated with Student
// s1.greet(); // TypeError: s1.greet is not a function



// If you change the prototype of Student, it will affect the prototype of Person
Student.prototype = Person.prototype;
Student.prototype.sayHello = function () {
    console.log("Hello");
}
// This works. Why? Because the prototype of Student is the same as the prototype of Person
new Student("Jane", 123).sayHello();
new Person("John").sayHello(); // Hello

// This is correct way to let Student inherit prototype of Person
Student.prototype = Object.create(Person.prototype);
Student.prototype.sayBye = function () {
    console.log("Bye");
}
new Student("Alice", 1234).sayBye();
// new Person("Bob").sayBye(); // TypeError: s1.sayBye is not a function
