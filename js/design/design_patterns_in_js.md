# Design Patterns in JavaScript
This doc serves the purpose of summary notes from the Udemy course [Design Patterns in JavaScript](https://www.udemy.com/course/design-patterns-javascript/)  


**What are design patterns?**  
In software engineering, a software design pattern is a general, reusable solution to a commonly occurring problem within a given context in software design.  


### SOLID PRINCIPLES
**What are SOLID principles?**  
In software engineering, SOLID is a mnemonic acronym for five design principles intended to make object-oriented designs more understandable, flexible, and maintainable.  
1. _**S**ingle Responsibility Principle_: A class should have only one reason to change meaning that it should have only one responsibility.
2. _**O**pen-Closed Principle_: Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.
3. _**L**iskov Substitution Principle_: Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.
4. _**I**nterface Segregation Principle_: No client should be forced to depend on methods it does not use. Many client-specific interfaces are better than one general-purpose interface. 
5. _**D**ependency Inversion Principle_: High-level modules should not depend on low-level modules. Depend upon abstractions. Do not depend upon concrete classes.

### Gamma Categorization
Design patterns are typically split into three categories:   
1. _Creational Pattern_: These design patterns are all about class instantiation or object creation.
2. _Structural Pattern_: These design patterns are about organizing different classes and objects to form larger structures and provide new functionality. 
3. _Behavioral Pattern_: These design patterns concerns with the responsibilities between objects by outlining the patterns for communication between objects. 

### Creational Design Patterns
**Builder Pattern**:   
Builder pattern is used to create complex objects with constituent parts that must be created in the same order or using a specific algorithm.  
- A builder is a separate component for building an object.
- We can either give builder an initializer or return it via static function.
- To make builder fluent, _return self_
- Different facets of an object can be built with different builders working in tandem via a base class.  
