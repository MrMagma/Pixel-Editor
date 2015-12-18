"use strict";

var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;
var PixelImage = require("../PixelImage/PixelImage.js");

var pixelImage = new PixelImage();

var events = {
    resize: function resize(_ref) {
        var width = _ref.width;
        var height = _ref.height;

        if (width > 0) {
            // Set the width of the pixels array
        }
        if (height > 0) {
            // Set the height of the pixels array
        }
    },
    setpixel: function setpixel(_ref2) {
        var x = _ref2.x;
        var y = _ref2.y;
        var color = _ref2.color;
    }
};

var CanvasStore = {};

_.extendOwn(CanvasStore, EventEmitter.prototype, {});

CanvasDispatcher.register(function (action) {
    if (events[action.type]) {
        events[action.type](action);
    }
});