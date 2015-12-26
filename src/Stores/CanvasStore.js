var CanvasStore = (function() {
    
    var _ = require("underscore");

    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var EventEmitter = require('events').EventEmitter;
    var PixelImage = require("../PixelImage/PixelImage.js");

    const LAYER_CHANGE_PREFIX = "layerPaint";

    var pixelImage = new PixelImage();

    var CanvasStore = {
        getLayers() {
            return pixelImage.getLayers();
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
        setPixel({x, y, color, layer="current"}) {
            pixelImage.layers[layer].setPixel(x, y, color);
            CanvasStore.emit(`${LAYER_CHANGE_PREFIX}_${layer}`);
        }
    };

    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        onLayerChange(layer, cb) {
            this.on(`${LAYER_CHANGE_PREFIX}_${layer}`, cb);
        },
        offLayerChange(layer, cb) {
            this.removeListener(`${LAYER_CHANGE_PREFIX}_${layer}`, cb);        
        }
    });

    CanvasDispatcher.register(function(action) {
        switch (action.type) {
            case constants.SET_PIXEL:
                CanvasStore.setPixel(action);
                break;
        }
    });

    module.exports = CanvasStore;
    return CanvasStore;

})();
