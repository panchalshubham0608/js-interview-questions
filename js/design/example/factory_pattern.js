function ToyDuck({ color, price }) {
    return {
        color,
        price
    }
}

function ToyCar({ color, price, name }) {
    return {
        color,
        price,
        name
    }
}

class ToyFactory {
    constructor() {
        this.toy = ToyCar;
    }

    createToy = function (toyChosen) {
        if (toyChosen.type === 'duck') {
            this.toy = ToyDuck;
        } else if (toyChosen.type === 'car') {
            this.toy = ToyCar;
        }
        return new this.toy(toyChosen);
    }
}

const toyFactory = new ToyFactory();
const toy1 = toyFactory.createToy({ type: 'duck', color: 'red', price: 10 });
console.log(toy1);
const toy2 = toyFactory.createToy({ type: 'car', color: 'blue', price: 20, name: 'Ferrari' });
console.log(toy2);
