var Pixel = require("./Pixel.js");

class PixelLayer {
    constructor(cfg = {}) {
        let {width = 1, height = 1} = cfg;
        this.pixelMap = [];
        for (let x = 0; x < width; x++) {
            this.pixelMap.push([]);
            for (let y = 0; y < height; y++) {
                this.pixelMap[x].push(new Pixel());
            }
        }
        
        this.width = width;
        this.height = height;
    }
    getPixel(x, y) {
        if (x < this.pixelMap.length) {
            return this.pixelMap[x][y];
        }
    }
    setPixel(cfg = {}) {
        let {x, y, color} = cfg;
        if (x >= 0 && x < this.pixelMap.length) {
            if (y >= 0 && y < this.pixelMap[x].length) {
                this.pixelMap[x][y].setColor(color);
            }
        }
    }
}

module.exports = PixelLayer;
