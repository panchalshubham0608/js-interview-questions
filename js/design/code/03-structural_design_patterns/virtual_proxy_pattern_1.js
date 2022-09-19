
class Image {
    constructor(url) {
        this.url = url;
        console.log(`Loading image from ${this.url}`);
    }

    draw() {
        console.log(`Drawing image from ${this.url}`);
    }
}

class LazyImage {
    constructor(url) {
        this.url = url;
        this.image = null;
    }

    draw() {
        if (!this.image) {
            this.image = new Image(this.url);                        
        }
        console.log(`Drawing image from ${this.url}`);
    }
}


function drawImage(img) {
    console.log(`About to draw the image`);
    img.draw();
    console.log(`Done drawing the image`);
}

let img = new Image('http://pokemon.com/pikachu.png');
drawImage(img);

let lazyImg = new LazyImage('http://pokemon.com/pikachu.png');
// drawImage(lazyImg);
// drawImage(lazyImg);
