"use strict";

var CanvasStore = (function () {

    var _ = require("underscore");

    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var EventEmitter = require('events').EventEmitter;
    var PixelImage = require("../PixelImage/PixelImage.js");

    var LAYER_CHANGE_PREFIX = "layerPaint";

    var pixelImage = new PixelImage();

    var CanvasStore = {
        getLayers: function getLayers() {
            return pixelImage.getLayers();
        },
        getWidth: function getWidth() {
            return pixelImage.width;
        },
        getHeight: function getHeight() {
            return pixelImage.height;
        },
        getPixelRGB: function getPixelRGB() {
            var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var x = cfg.x;
            var y = cfg.y;
            var _cfg$layer = cfg.layer;
            var layer = _cfg$layer === undefined ? "current" : _cfg$layer;

            if (_.isNumber(x) && !_.isNaN(x) && _.isNumber(y) && !_.isNaN(y)) {
                return pixelImage.getLayer(layer).getPixel(x, y).getRGB();
            } else {
                throw new TypeError("Coordinates must be numbers and not NaN");
            }
        },
        setPixel: function setPixel(_ref) {
            var x = _ref.x;
            var y = _ref.y;
            var color = _ref.color;
            var _ref$layer = _ref.layer;
            var layer = _ref$layer === undefined ? "current" : _ref$layer;

            pixelImage.layers[layer].setPixel(x, y, color);
            CanvasStore.emit(LAYER_CHANGE_PREFIX + "_" + layer);
        }
    };

    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        onLayerChange: function onLayerChange(layer, cb) {
            this.on(LAYER_CHANGE_PREFIX + "_" + layer, cb);
        },
        offLayerChange: function offLayerChange(layer, cb) {
            this.removeListener(LAYER_CHANGE_PREFIX + "_" + layer, cb);
        }
    });

    CanvasDispatcher.register(function (action) {
        switch (action.type) {
            case constants.SET_PIXEL:
                CanvasStore.setPixel(action);
                break;
        }
    });

    module.exports = CanvasStore;
    return CanvasStore;
})();