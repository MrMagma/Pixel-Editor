"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PixelLayer = (function () {

    var Pixel = require("./Pixel.js");

    var PixelLayer = (function () {
        function PixelLayer() {
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

            this.width = width;
            this.height = height;
        }

        _createClass(PixelLayer, [{
            key: "getPixel",
            value: function getPixel(x, y) {
                if (x < this.pixelMap.length && y < this.pixelMap[x].length) {
                    return this.pixelMap[x][y];
                } else {
                    // Throw an error if a pixel is out of bounds. It's a bit harsh,
                    // but it will teach whoever made that mistake their lesson.
                    throw new RangeError("Coordinates (" + x + ", " + y + ") are out of range");
                }
            }
        }, {
            key: "setPixel",
            value: function setPixel() {
                var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var x = cfg.x;
                var y = cfg.y;
                var color = cfg.color;

                if (x >= 0 && x < this.pixelMap.length) {
                    if (y >= 0 && y < this.pixelMap[x].length) {
                        this.pixelMap[x][y].setColor(color);
                    }
                }
            }
        }]);

        return PixelLayer;
    })();

    module.exports = PixelLayer;
    return PixelLayer;
})();