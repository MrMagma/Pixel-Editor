var CanvasStore = (function() {
    
    var EventEmitter = require('events').EventEmitter;
    var _ = require("underscore");
    
    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var PixelImage = require("../PixelImage/PixelImage.js");
    
    const IMAGE_CHANGE_PREFIX = "imageChange";
    const LAYER_CHANGE_PREFIX = "layerChange";
    const BRUSH_CHANGE_EVENT = "brushChange";
    
    var pixelImage = new PixelImage();
    var brushColor = [0, 0, 0, 1.0];

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
        getPixelHSL(cfg = {}) {
            let {x, y, layer = "current"} = cfg;
            if (_.isNumber(x) && !_.isNaN(x) &&
                _.isNumber(y) && !_.isNaN(y)) {
                return pixelImage.getLayer(layer).getPixel(x, y).getHSL();
            } else {
                throw new TypeError("Coordinates must be numbers and not NaN");
            }
        },
        getDimensions() {
            return pixelImage.getDimensions();
        },
        getBrushColor() {
            return [brushColor[0], brushColor[1],
                brushColor[2], brushColor[3]];
        },
        setPixel(action) {
            let {layerName, x, y} = action;
            let layer = pixelImage.getLayer(layerName),
                pixel = layer.getPixel(x, y);
            let originalHSL = pixel.getHSL();
            layer.setPixelHSL(action);
            // Do this because we don't want to say a pixel has been changed
            // if nothing actually changed as that would trigger a render and
            // rendering is expensive.
            if (pixel.getHSL() !== originalHSL) {
                this.emitPixelChange({
                    x: x,
                    y: y,
                    layerName: layer.layerName
                });
            }
        },
        setDimensions(action) {
            pixelImage.setDimensions(action);
            this.emitDimensionChange();
        },
        setBrushColor({color}) {
            let [h, s, l, a = brushColor[3]] = color;
            brushColor[0] = h;
            brushColor[1] = s;
            brushColor[2] = l;
            brushColor[3] = a;
            this.emitBrushChange();
        }
    };
    
    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        // Maybe make things just able to listen for changes in a layer, and
        // then leave it up to the listener to determine if the event was
        // relevant to them
        onPixelChange({layerName, callback}) {
            this.on(`${LAYER_CHANGE_PREFIX}_${layerName}`, callback);           
        },
        offPixelChange({layerName, callback}) {
            this.removeListener(`${LAYER_CHANGE_PREFIX}_${layerName}`,
                    callback);
        },
        onDimensionChange({callback}) {
            this.on(`${IMAGE_CHANGE_PREFIX}_dimensionChange`, callback);
        },
        offDimensionChange({callback}) {
            this.removeListener(`${IMAGE_CHANGE_PREFIX}_dimensionChange`,
                callback);
        },
        onBrushChange({callback}) {
            this.on(BRUSH_CHANGE_EVENT, callback);
        },
        offBrushChange({callback}) {
            this.removeListener(BRUSH_CHANGE_EVENT, callback);
        },
        emitPixelChange({x, y, layerName}) {
            this.emit(`${LAYER_CHANGE_PREFIX}_${layerName}`, {
                x: x,
                y: y
            });
        },
        emitDimensionChange() {
            this.emit(`${IMAGE_CHANGE_PREFIX}_dimensionChange`);
        },
        emitBrushChange() {
            this.emit(BRUSH_CHANGE_EVENT);
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
            case constants.SET_BRUSH:
                CanvasStore.setBrushColor(action);
                break;
            default:
        }
    });
    
    module.exports = CanvasStore;
    return CanvasStore;
    
})();
