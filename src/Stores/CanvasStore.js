var _ = require("underscore");

var constants = require("../Constants.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;
var PixelImage = require("../PixelImage/PixelImage.js");

const PIXEL_CHANGE = "pixelChange";

var pixelImage = new PixelImage();

var CanvasStore = {
    getLayers() {
        return pixelImage.getLayers();
    },
    getLayer(name = "current") {
        return pixelImage.getLayer(name);
    },
    getFlattened() {
        return pixelImage.flatten();
    },
    getWidth() {
        return pixelImage.width;
    },
    getHeight() {
        return pixelImage.height;
    },
    setPixel({x, y, color}) {
        pixelImage.layers.current.setPixel(x, y, color);
        CanvasStore.emit(PIXEL_CHANGE);
    }
};

_.extendOwn(CanvasStore, EventEmitter.prototype, {
    onPixelChange(cb) {
        this.on(PIXEL_CHANGE, cb);
    },
    offPixelChange(cb) {
        this.removeListener(PIXEL_CHANGE, cb);
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
