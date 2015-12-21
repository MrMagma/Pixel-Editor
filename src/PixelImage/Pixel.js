var Color = require("./Color.js");

class Pixel {
    constructor() {
        this.color = 0x000000;
        this.alpha = 0.0
    }
    setColor(color = this.color) {
        this.color = color;
    }
    setAlpha(alpha = this.alpha) {
        this.alpha = alpha;
    }
}

module.exports = Pixel;
