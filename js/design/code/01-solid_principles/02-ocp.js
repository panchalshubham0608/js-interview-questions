// 2. Open-Closed Principle
// Software entities (classes, modules, functions, etc.) should be 
// open for extension, but closed for modification.

const Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

const Size = Object.freeze({
    small: 'small',
    medium: 'medium',
    large: 'large',
});

class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter {
    filterBySize(products, size) {
        return products.filter(p => p.size === size);
    }
    filterByColor(products, color) {
        return products.filter(p => p.color === color);
    }

    // here we break the OCP
    // because we are modifying the class
    // to add a new filter
    // filterBySizeAndColor(products, size, color) { ... }
}


let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];
console.log('Green products (old):');
for (let p of new ProductFilter().filterByColor(products, Color.green))
    console.log(` * ${p.name} is green`);

// ^^ BEFORE

// vv AFTER
class ColorSpecification{
    constructor(color) {
        this.color = color;
    }
    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification{
    constructor(size) {
        this.size = size;
    }
    isSatisfied(item) {
        return item.size === this.size;
    }
}

// With this filter we need not to change the class
// we just need to create a new class for the new specification
class BetterFilter {
    constructor() {}
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x));
    }
}

let bf = new BetterFilter();
console.log('Green products (new):');
for (let p of bf.filter(products, new ColorSpecification(Color.green)))
    console.log(` * ${p.name} is green`);

// ^^ AFTER

// vv AFTER (better)

class AndSpecification {
    constructor(...specs) {
        this.specs = specs;
    }
    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item));
    }
}

console.log('Large blue items:');
let spec = new AndSpecification(
    new ColorSpecification(Color.blue),
    new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, spec))
    console.log(` * ${p.name} is large and blue`);
