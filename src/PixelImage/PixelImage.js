var PixelImage = (function() {
    
    var PixelLayer = require("./PixelLayer.js");
    var _ = require("underscore");

    class PixelImage {
        constructor() {
            this.currentLayer = "main";
            this.layers = {
                main: new PixelLayer({
                    name: "main",
                    z: 0
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
                    name: name,
                    z: this.layers[this.layerNames
                        [this.layerNames.length - 1]].getZ() + 1
                });
                this.layerNames.unshift(name);
            }
        }
        sortLayers() {
            this.layerNames = this.layerNames.sort((layer1, layer2) => {
                return this.layers[layer1].getZ() - this.layers[layer2].getZ();
            });
        }
        moveLayerUp(layer) {
            let ind = this.layerNames.indexOf(layer);
            if (ind === this.layerNames.length - 1) {
                this.getLayer(layer).z += 1;
            } else {
                let layer2 = this.getLayer(this.layerNames[ind + 1]);
                this.moveLayerAbove(layer, layer2);
            }
        }
        moveLayerDown(layer) {
            let ind = this.layerNames.indexOf(layer);
            if (ind === 0) {
                this.getLayer(layer).z -= 1;
            } else {
                let layer2 = this.getLayer(this.layerNames[ind - 1]);
                this.moveLayerBelow(layer, layer2);
            }                
        }
        moveLayerAbove(layer1, layer2) {
            this.getLayer(layer1).setZ(this.getLayer(layer2).getZ() + 1);
            this.sortLayers();
        }
        moveLayerBelow(layer1, layer2) {
            this.getLayer(layer1).setZ(this.getLayer(layer2).getZ() - 1);
            this.sortLayers();
        }
        swapLayers(layer1, layer2) {
            layer1 = this.getLayer(layer1),
            layer2 = this.getLayer(layer2);
            
            let z1 = layer1.getZ(),
                z2 = layer2.getZ();
                
            layer1.setZ(z2);
            layer2.setZ(z1);
            
            this.sortLayers();
        }
        getLayer(name = "current") {
            return this.layers[name];
        }
        getLayers() {
            return this.layerNames;
        }
        getLayerZ(name = "current") {
            if (name === "current") {
                name = this.layers.current.layerName;
            }
            return this.layerNames.indexOf(name);
        }
        setLayerZ(name = "current", z) {
            if (name === "current") {
                name = this.layers.current.layerName;
            }
            this.layers[name].setZ(z);
            this.sortLayers();
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
