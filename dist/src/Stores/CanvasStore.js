"use strict";

var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;

var pixels = [[0]];

var CanvasStore = {
    resize: function resize(_ref) {
        var _ref$width = _ref.width;
        var width = _ref$width === undefined ? pixels.length : _ref$width;
        var _ref$height = _ref.height;
        var height = _ref$height === undefined ? pixels[0].length : _ref$height;
    }
};

_.extendOwn(CanvasStore, EventEmitter.prototype, {});

CanvasDispatcher.register(function (action) {
    if (CanvasStore[action.type]) {
        CanvasStore[action.type](action);
    }
});