class Book {
    static counter = 0;
    constructor(isbn, title, subject, publisher, language, numPages) {
        this._id = Book.counter++;
        // ...
    }
}

const BookStatus = Object.freeze({
    Available: 1,
    CheckedOut: 2,
    Reserved: 3,
    Lost: 4
});

const ReservationStatus = Object.freeze({
    Waiting: 1,
    Reserved: 2,
    Cancelled: 3,
    None: 4
});

const BookFormat = Object.freeze({
    Hardcover: 1,
    Paperback: 2,
    AudioBook: 3,
    Ebook: 4,
    Newspapaer: 5,
    Magazine: 6,
    Journal: 7
});

class BookIssueDetails {    
    constructor(status, issuedMemberId, issueDate, dueDate) { }
    calculateOverdueFine() {}
}

class BookReservationDetails {
    constructor(status, reservedMemberId, reservationDate) { }
}

class Rack {
    constructor(number, location) { }
}

class BookItem {
    constructor(book, rackNumber, format) {
        this._id = book.id;
        this._book = book;
        this._rackNumber = rackNumber;
        this._format = format;
        this._issueDetails = new BookIssueDetails(BookStatus.Available, null, null, null);
        this._reservationDetails = new BookReservationDetails(ReservationStatus.None, null, null);
    }
}

// BookSpecification is used to search for books
class BookSpecification {
    isSatisified(book) {}
}
class BookIDSpecification extends BookSpecification {
    constructor(id) { this.id = id; }
    isSatisified(book) { return book.id === this.id; }
}
class BookTitleSpecification extends BookSpecification { }
class BookAuthorSpecification extends BookSpecification { }
class BookPublisherSpecification extends BookSpecification { }

class AndSpecification {
    constructor(...specs) { this.specs = specs; }
    isSatisified(book) { return this.specs.every(spec => spec.isSatisified(book)); }
}
class OrSpecification {
    constructor(...specs) { this.specs = specs; }
    isSatisified(book) { return this.specs.any(spec => spec.isSatisified(book)); }
}
class NotSpecification {
    constructor(spec) { this.spec = spec; }
    isSatisified(book) { return !this.spec.isSatisified(book); }
}

// Following the OCP principle
// Open for extension (of new fiilters) but closed for modification
class BookCatalog {
    constructor() {
        this._bookItems = [];
    }
    addBookItem(bookItem) {}
    removeBookItem(bookItem) {}
    search(bookSpecification) {}
}









// Classes
class Address {
    constructor(street, city, state, zipCode) { }
}

class Person {
    constructor(name, address, email, phone) { }
}

class User {
    static counter = 0;
    constructor(password, person) {
        this._id = User.counter++;
        // ...
    }
    resetPassword(newPassword) {}
}

const UserStatus = Object.freeze({
    Active: 1,
    Closed: 2,
    Canceled: 3,
    Blocked: 4,
    None: 5
});

const UserType = Object.freeze({
    Admin: 1,
    Librarian: 2,
    Member: 3,
});


class Admin extends User {
    constructor(password, person) {
        super(password, person);
    }

    addLibrarian(library, librarian) {}
    removeLibrarian(library, librarianId) {}
}

class Librarian extends User {
    constructor(password, person) {
        super(password, person);
    }

    addBookItem(library, bookItem) {}
    removeBookItem(library, bookItemId){}

    addMember(library, member) {}
    removeMember(library, memberId) {}

    blockMember(library, memberId) {}
    unblockMember(library, memberId) {}

    issueBookItem(library, bookItemId, memberId) {}
    renewBookItem(library, bookItemId) {}
    returnBookItem(library, bookItemId) {}
}

class Member extends User {
    constructor(password, person) {
        super(password, person);
        this.bookItemsCheckedOutIDs = [];
    }

    getNumberOfBooksCheckedOut(library, memberId) {}
    reserveBookItem(library, bookItemId, memberId) {}
}

// Factory method
class UserFactory {
    static createUser(type, password, person) {
        switch(type) {
            case AccountType.Admin:
                return new Admin(password, person);
            case AccountType.Librarian:
                return new Librarian(password, person);
            case AccountType.Member:
                return new Member(password, person);
        }
    }
}

// same specifications for users as above for books
// ....


class MembersCatalog {
    constructor() {
        this._members = [];
    }
    addMember(member) {}
    removeMember(member) {}
    search(userSpecification) {}
}

class Library {
    static counter = 0;
    constructor(name, address) {
        this._id = Library.counter++;
        this._name = name;
        this._address = address;
        this._bookCatalog = new BookCatalog();
        this._memberCatalog = new MembersCatalog();
        this._admins = [];
        this._librarians = [];
    }

    addAdmin(admin) {}
    removeAdmin(adminId) {}
}


// constants for the system
const SystemConstants = Object.freeze({
    MaxBooksThatCanBeIssued: 5,
    MaxDaysABookCanBeIssued: 10
});




// LibrarySystem is the facade
// system is responsible for interaction between user and library
class LibrarySystem {
    constructor(library) {
        this.library = library;
    }

    // For admin related stuff
    addAddmin(admin) { }
    addLibrarian(adminId, librarian) { }
    removeLibrarian(adminId, librarianId) { }

    // For librarian related stuff
    addBookItem(memberId, bookItem) {}
    removeBookItem(memberId, bookId) {}
    blockMember(memberId) {}
    unblockMember(memberId) {}
    issueBookItem(bookItemId, memberId) {}
    renewBookItem(bookItemId) {}
    returnBookItem(bookItemId) {}
    addMember(member) {}
    removeMember(memberId) {}

    // For member related stuff
    getNumberOfBooksCheckedOut(memberId) {}
    reserveBookItem(bookItemId, memberId) {}

    // For searching
    searchBooks(bookSpecification) {}
}


// Client code
const library = new Library('Library', new Address('Street', 'City', 'State', 'ZipCode'));
const librarySystem = new LibrarySystem(library);

const admin = UserFactory.createUser(UserType.Admin, 'password', new Person('name', new Address('Street', 'City', 'State', 'ZipCode'), 'email', 'phone'));
librarySystem.addAdmin(admin);

const librarian = UserFactory.createUser(UserType.Librarian, 'password', new Person('name', new Address('Street', 'City', 'State', 'ZipCode'), 'email', 'phone'));
librarySystem.addLibrarian(admin.id, librarian);
