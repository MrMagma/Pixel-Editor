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
        getTrueLayerName: function getTrueLayerName(layerName) {
            return pixelImage.getLayer(layerName).layerName;
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
        setPixel: function setPixel(action) {
            var layerName = action.layerName;
            var x = action.x;
            var y = action.y;

            var layer = pixelImage.getLayer(layerName);
            layer.setPixelRGB(action);
            this.emitPixelChange({
                x: x,
                y: y,
                layerName: layer.layerName
            });
        },
        emitPixelChange: function emitPixelChange(_ref) {
            var x = _ref.x;
            var y = _ref.y;
            var layerName = _ref.layerName;

            this.emit(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y);
        }
    };

    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        // Maybe make things just able to listen for changes in a layer, and
        // then leave it up to the listener to determine if the event was
        // relevant to them

        onPixelChange: function onPixelChange(_ref2) {
            var layerName = _ref2.layerName;
            var x = _ref2.x;
            var y = _ref2.y;
            var callback = _ref2.callback;

            this.on(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y, callback);
        },
        offPixelChange: function offPixelChange(_ref3) {
            var layerName = _ref3.layerName;
            var x = _ref3.x;
            var y = _ref3.y;
            var callback = _ref3.callback;

            this.removeListener(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y, callback);
        }
    });

    CanvasDispatcher.register(function (action) {
        switch (action.actionType) {
            case constants.SET_PIXEL:
                CanvasStore.setPixel(action);
                break;
        }
    });

    module.exports = CanvasStore;
    return CanvasStore;
})();