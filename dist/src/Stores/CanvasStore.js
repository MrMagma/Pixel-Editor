"use strict";

var CanvasStore = (function () {

    var EventEmitter = require('events').EventEmitter;
    var _ = require("underscore");

    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var PixelImage = require("../PixelImage/PixelImage.js");

    var IMAGE_CHANGE_PREFIX = "imageChange";
    var LAYER_CHANGE_PREFIX = "layerChange";

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
        getDimensions: function getDimensions() {
            return pixelImage.getDimensions();
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
        setDimensions: function setDimensions(action) {
            pixelImage.setDimensions(action);
            this.emitDimensionChange();
        }
    };

    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        // Maybe make things just able to listen for changes in a layer, and
        // then leave it up to the listener to determine if the event was
        // relevant to them

        onPixelChange: function onPixelChange(_ref) {
            var layerName = _ref.layerName;
            var x = _ref.x;
            var y = _ref.y;
            var callback = _ref.callback;

            this.on(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y, callback);
        },
        offPixelChange: function offPixelChange(_ref2) {
            var layerName = _ref2.layerName;
            var x = _ref2.x;
            var y = _ref2.y;
            var callback = _ref2.callback;

            this.removeListener(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y, callback);
        },
        onDimensionChange: function onDimensionChange(_ref3) {
            var callback = _ref3.callback;

            this.on(IMAGE_CHANGE_PREFIX + "_dimensionChange", callback);
        },
        offDimensionChange: function offDimensionChange(_ref4) {
            var callback = _ref4.callback;

            this.removeListener(IMAGE_CHANGE_PREFIX + "_dimensionChange", callback);
        },
        emitPixelChange: function emitPixelChange(_ref5) {
            var x = _ref5.x;
            var y = _ref5.y;
            var layerName = _ref5.layerName;

            this.emit(LAYER_CHANGE_PREFIX + "_" + layerName + "_" + x + "-" + y);
        },
        emitDimensionChange: function emitDimensionChange() {
            this.emit(IMAGE_CHANGE_PREFIX + "_dimensionChange");
        }
    });

    CanvasDispatcher.register(function (action) {
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