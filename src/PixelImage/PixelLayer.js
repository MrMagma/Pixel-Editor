var PixelLayer = (function() {
    
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
            if (x < this.pixelMap.length && y < this.pixelMap[x].length) {
                return this.pixelMap[x][y];
            } else {
                // Throw an error if a pixel is out of bounds. It's a bit harsh,
                // but it will teach whoever made that mistake their lesson.
                throw new RangeError(`Coordinates (${x}, ${y}) are out of range`);
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
    return PixelLayer;
    
})();
