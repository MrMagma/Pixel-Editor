"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixel = require("./Pixel.js");

var PixelLayer = function PixelLayer() {
    var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PixelLayer);

    var _cfg$width = cfg.width;
    var width = _cfg$width === undefined ? 1 : _cfg$width;
    var _cfg$height = cfg.height;
    var height = _cfg$height === undefined ? 1 : _cfg$height;

    this.pixelMap = [];
    for (var x = 0; x < width; x++) {
        this.pixelMap.push([]);
        for (var y = 0; y < height; y++) {
            this.pixelMap[x].push(new Pixel());
        }
    }
};

module.exports = PixelLayer;