var PixelImage = (function() {
    
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
            
            this.width = this.layers.main.width;
            this.height = this.layers.main.height;
        }
        validLayerName(name) {
            return _.isString(name) && name !== "current";
        }
        addLayer(name) {
            if (this.validLayerName(name)) {
                this.layers[name] = new PixelLayer();
            }
        }
        getLayer(name = "current") {
            return this.layers[name];
        }
        getLayers() {
            let layerNames = [];
            for (let key in this.layers) {
                if (this.layers.hasOwnProperty(key) && key !== "current") {
                    layerNames.push(key);
                }
            }
            return layerNames;
        }
        flatten() {
            let layers = this.getLayers();
            let base = this.layers[layers[0]];
            
            for (let i = 1; i < layers.length; i++) {
                // Merge the current layer with base
            }
            
            return base;
        }
    }

module.exports = PixelImage;
    return PixelImage;
    
})();
