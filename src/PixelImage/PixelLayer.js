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
    }
}

module.exports = PixelLayer;
