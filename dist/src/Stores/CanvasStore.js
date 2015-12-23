"use strict";

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
    getPixelRGB: function getPixelRGB(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var _ref$layer = _ref.layer;
        var layer = _ref$layer === undefined ? "current" : _ref$layer;

        return pixelImage.getLayer(layer).getPixel(x, y).getRGB();
    },
    setPixel: function setPixel(_ref2) {
        var x = _ref2.x;
        var y = _ref2.y;
        var color = _ref2.color;
        var _ref2$layer = _ref2.layer;
        var layer = _ref2$layer === undefined ? "current" : _ref2$layer;

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