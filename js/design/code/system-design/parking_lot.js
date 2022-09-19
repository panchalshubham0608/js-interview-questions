class Address {
    constructor(street, city, state, zip) { }
}

class Person {
    constructor(name, address) { }
}

class User {
    static counter = 0;
    constructor(person) {
        this._id = User.counter++;
        this._person = person;
    }
}

class Admin extends User {
    constructor(person) {}

    addParkingFloor(parkingLot, parkingFloor) {}
    removeParkingFloor(parkingLot, parkingFloorId) {}

    addParkingAttendant(parkingLot, parkingAttendent) { }
    removeParkingAttendant(parkingLot, parkingAttendentId) { }
}

class ParkingAttendent extends User {
    constructor(person) {}
    findParkingSpot(parkingLot, vehicle){}
    createEntryTicket(parkingLot, spot, vehicle){}
    processExitTicket(parkingLot, ticketId){}
}

const VehicleType = Object.freeze({
    CAR: 'car',
    TRUCK: 'truck',
    ELECTRIC: 'electric',
    VAN: 'van',
    MOTORBIKE: 'motorbike'    
});

class Vehicle {
    constructor(licensePlate, type, color, wheels) { /* ... */ }
}

class Car extends Vehicle {}
class Truck extends Vehicle {}
class Electric extends Vehicle {}
class Van extends Vehicle {}
class Motorbike extends Vehicle {}

const ParkingSpotType = Object.freeze({
    Motorbike: 'motorbike',
    Compact: 'compact',
    Large: 'large',
    Electric: 'electric'
});

class ParkingSpot {
    static counter = 0;
    constructor(floorNumber, type, charges) { 
        this._id = ++ParkingSpot.counter;
        // ...
    }
    canPark(vehicle) { /* ... */ }
}
class MotorbikeSpot extends ParkingSlot {}
class CompactSpot extends ParkingSlot {}
class LargeSpot extends ParkingSlot {}
class ElectricSpot extends ParkingSlot {}


// specifications for parking-spot
class ParkingSpotCatalog {
    constructor() {
        this._parkingSpots = [];
    }
    addParkingSpot(parkingSpot) { /* ... */ }
    removeParkingSpot(parkingSpotId) { /* ... */ }
    search(parkingSpotSpecification) { /* ... */ }
}

class ParkingFloor {
    constructor(floorNumber) {
        this._floorNumber = floorNumber;
        this._parkingCatalog = new ParkingSpotCatalog();
    }

    addParkingSpot(spot) { /* ... */ }
    findParkingSpot(vehicle) { /* ... */ }
}


class ParkingLot {
    static counter = 0;
    constructor(name){
        this._id = ParkingLot.counter++;
        this._name = name;
        this._floors = [];
        this._tikets = [];
        this._admins = [];
        this._attendants = [];
    }
}




const ParkingTicketStatus = Object.freeze({
    ACTIVE: 'active',
    PAID: 'paid',
    LOST: 'lost'
});
class ParkingTicket {
    static counter = 0;
    constructor(vehicle, parkingLot, parkingSpot, validFrom, validTo) {
        this._id = ++ParkingTicket.counter;
        // ...
    }
    calculateCharges() { /* ... */ }
    calculateFine() { /* ... */ }
}

// Facade
class ParkingLotSystem {
    constructor(name) {
        this.parkingLot = new ParkingLot(name);
    }

  
    // Admin related stuff
    addParkingFloor(parkingLot, parkingFloor) {}
    removeParkingFloor(parkingLot, parkingFloorId) {}
    addParkingAttendant(parkingLot, parkingAttendent) { }
    removeParkingAttendant(parkingLot, parkingAttendentId) { }


    // Attendent related stuff
    findParkingSpot(vehicle) { /* ... */ }
    createEntryTicket(spot, vehicle){}
    processExitTicket(ticketId){}
}
