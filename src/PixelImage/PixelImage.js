var PixelLayer = require("./PixelLayer.js");
var _ = require("underscore");

class PixelImage {
    constructor() {
        this.currentLayer = "main";
        this.layers = {
            main: new PixelLayer()
        };
        
        Object.defineProperty(this.layers, "current", {
            get: (function() {
                return this.layers[this.currentLayer];
            }).bind(this)
        });
    }
    validLayerName(name) {
        return _.isString(name) && name !== "current";
    }
    addLayer(name) {
        if (this.validLayerName(name)) {
            this.layers[name] = new PixelLayer();
        }
    }
}

module.exports = PixelImage;
