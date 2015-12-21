"use strict";

var _ = require("underscore");

var constants = require("../Constants.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;
var PixelImage = require("../PixelImage/PixelImage.js");

var PIXEL_CHANGE = "pixelChange";

var pixelImage = new PixelImage();

var CanvasStore = {
    getLayers: function getLayers() {
        return pixelImage.getLayers();
    },
    getLayer: function getLayer() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? "current" : arguments[0];

        return pixelImage.getLayer(name);
    },
    getFlattened: function getFlattened() {
        return pixelImage.flatten();
    },
    getWidth: function getWidth() {
        return pixelImage.width;
    },
    getHeight: function getHeight() {
        return pixelImage.height;
    },
    setPixel: function setPixel(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var color = _ref.color;

        pixelImage.layers.current.setPixel(x, y, color);
        CanvasStore.emit(PIXEL_CHANGE);
    }
};

_.extendOwn(CanvasStore, EventEmitter.prototype, {
    onPixelChange: function onPixelChange(cb) {
        this.on(PIXEL_CHANGE, cb);
    },
    offPixelChange: function offPixelChange(cb) {
        this.removeListener(PIXEL_CHANGE, cb);
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