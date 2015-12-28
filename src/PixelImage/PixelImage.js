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
            
            this.layerNames = ["main"];
        }
        validLayerName(name) {
            return _.isString(name) && name !== "current" &&
                this.layerNames.indexOf(name) === -1;
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
            return this.layerNames;
        }
        setDimensions({width = this.width, height = this.height}) {
            for (let layerName of this.layerNames) {
                this.layers[layerName].setDimensions(width, height);
            }
            this.width = width;
            this.height = height;
        }
        getDimensions() {
            return {
                width: this.width,
                height: this.height
            };
        }
    }

module.exports = PixelImage;
    return PixelImage;
    
})();
