// 4. Interface Segregation Principle
// Many client-specific interfaces are better than one general-purpose interface.
// ISP states that no client should be forced to depend on methods it does not use.
// ISP splits interfaces that are very large into smaller and more specific ones 
// so that clients will only have to know about the methods that are of interest to them.
// ISP is about making fine grained interfaces that are client specific.



// Printer Interface with multiple methods
class IPrinter {

    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer is abstract!');
        }
    }

    print(doc) {
        // ...
    }

    fax(doc) {
        // ...
    }

    scan(doc) {
        // ...
    }
}

// Multi-function printer
class MultiFunctionPrinter extends IPrinter {
    print(doc) {
        // ...
    }

    fax(doc) {
        // ...
    }

    scan(doc) {
        // ...
    }

}

// Old-fashion printer
class OldFashionPrinter extends IPrinter {
    print(doc) {
        // ...
    }

    // Here we have a problem, we have to implement methods that we don't need
    // and we can't use them
    // This is a violation of Interface Segregation Principle
    // The Interface Segregation Principle states that
    // no client should be forced to depend on methods it does not use.
    fax(doc) {
        throw new Error('Fax is not supported!');
    }

    scan(doc) {
        throw new Error('Scan is not supported!');
    }

}



class IJustAPrinter {
    print(doc) {
        // ...
    }
}

class IJustAScanner {
    scan(doc) {
        // ...
    }
}

class JustAPrinter extends IJustAPrinter {
    print(doc) {
        // ...
    }
}

class JustAScanner extends IJustAScanner {
    scan(doc) {
        // ...
    }
}


// Multiple inheritance is not supported in JavaScript
// class JustAPrinterAndScanner extends IJustAPrinter, IJustAScanner {
//     print(doc) {
//         // ...
//     }

//     scan(doc) {
//         // ...
//     }

// }

