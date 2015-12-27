var PixelImage = (function() {
    
    var PixelLayer = require("./PixelLayer.js");
    var _ = require("underscore");

    class PixelImage {
        constructor() {
            this.currentLayer = "main";
            this.layers = {
                main: new PixelLayer({
                    name: "main"
                })
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
                this.layers[name] = new PixelLayer({
                    name: name
                });
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
    }

module.exports = PixelImage;
    return PixelImage;
    
})();
