var CanvasStore = (function() {
    
    var EventEmitter = require('events').EventEmitter;
    var _ = require("underscore");
    
    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var PixelImage = require("../PixelImage/PixelImage.js");
    
    const IMAGE_CHANGE_PREFIX = "imageChange";
    const LAYER_CHANGE_PREFIX = "layerChange";
    
    var pixelImage = new PixelImage();

    var CanvasStore = {
        getLayers() {
            return pixelImage.getLayers();
        },
        getTrueLayerName(layerName) {
            return pixelImage.getLayer(layerName).layerName;
        },
        getWidth() {
            return pixelImage.width;
        },
        getHeight() {
            return pixelImage.height;
        },
        getPixelRGB(cfg = {}) {
            let {x, y, layer = "current"} = cfg;
            if (_.isNumber(x) && !_.isNaN(x) &&
                _.isNumber(y) && !_.isNaN(y)) {
                return pixelImage.getLayer(layer).getPixel(x, y).getRGB();
            } else {
                throw new TypeError("Coordinates must be numbers and not NaN");
            }
        },
        getDimensions() {
            return pixelImage.getDimensions();
        },
        setPixel(action) {
            let {layerName, x, y} = action;
            let layer = pixelImage.getLayer(layerName);
            layer.setPixelRGB(action);
            this.emitPixelChange({
                x: x,
                y: y,
                layerName: layer.layerName
            });
        },
        setDimensions(action) {
            pixelImage.setDimensions(action);
            this.emitDimensionChange();
        }
    };
    
    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        // Maybe make things just able to listen for changes in a layer, and
        // then leave it up to the listener to determine if the event was
        // relevant to them
        onPixelChange({layerName, x, y, callback}) {
            this.on(`${LAYER_CHANGE_PREFIX}_${layerName}_${x}-${y}`, callback);           
        },
        offPixelChange({layerName, x, y, callback}) {
            this.removeListener(`${LAYER_CHANGE_PREFIX}_${layerName}_${x}-${y}`,
                    callback);
        },
        onDimensionChange({callback}) {
            this.on(`${IMAGE_CHANGE_PREFIX}_dimensionChange`, callback);
        },
        offDimensionChange({callback}) {
            this.removeListener(`${IMAGE_CHANGE_PREFIX}_dimensionChange`,
                callback);
        },
        emitPixelChange({x, y, layerName}) {
            this.emit(`${LAYER_CHANGE_PREFIX}_${layerName}_${x}-${y}`);
        },
        emitDimensionChange() {
            this.emit(`${IMAGE_CHANGE_PREFIX}_dimensionChange`);
        }
    });

    CanvasDispatcher.register(function(action) {
        switch (action.actionType) {
            case constants.SET_PIXEL:
                CanvasStore.setPixel(action);
                break;
            case constants.SET_DIMENSIONS:
                CanvasStore.setDimensions(action);
                break;
            default:
        }
    });
    
    module.exports = CanvasStore;
    return CanvasStore;
    
})();
