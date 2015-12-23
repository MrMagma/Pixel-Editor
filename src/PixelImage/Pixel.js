var Color = require("./Color.js");

class Pixel {
    constructor() {
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 0.0;
    }
    get rgb() {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
    }
    getRGB() {
        return this.rgb;
    }
}

module.exports = Pixel;
