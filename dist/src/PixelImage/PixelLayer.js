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
            var _cfg$z = cfg.z;
            var z = _cfg$z === undefined ? 0 : _cfg$z;
            var name = cfg.name;

            this.layerName = name;
            this.width = width;
            this.height = height;
            this.z = z;

            this.pixelMap = [];

            for (var x = 0; x < width; x++) {
                this.pixelMap.push([]);
                for (var y = 0; y < height; y++) {
                    this.pixelMap[x].push(new Pixel());
                }
            }
        }

        _createClass(PixelLayer, [{
            key: "isInBounds",
            value: function isInBounds(x, y) {
                return x >= 0 && y >= 0 && x < this.width && y < this.height;
            }
        }, {
            key: "getPixel",
            value: function getPixel(x, y) {
                if (this.isInBounds(x, y)) {
                    return this.pixelMap[x][y];
                } else {
                    // Throw an error if a pixel is out of bounds. It's a bit harsh,
                    // but it will teach whoever made that mistake their lesson.
                    throw new RangeError("Coordinates (" + x + ", " + y + ") are out of range");
                }
            }
        }, {
            key: "getZ",
            value: function getZ() {
                return this.z;
            }
        }, {
            key: "setPixelHSL",
            value: function setPixelHSL() {
                var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
                var x = cfg.x;
                var y = cfg.y;
                var color = cfg.color;

                if (this.isInBounds(x, y)) {
                    this.pixelMap[x][y].setHSL(color);
                } else {
                    throw new RangeError("Coordinates (" + x + ", " + y + ") are out of range");
                }
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                width = Math.max(width, 0);
                if (width > this.width) {
                    for (var x = this.width; x < width; x++) {
                        var row = [];
                        for (var y = 0; y < this.height; y++) {
                            row.push(new Pixel());
                        }
                        this.pixelMap.push(row);
                    }
                } else if (width < this.width) {
                    this.pixelMap.length = width;
                }
                this.width = width;
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                height = Math.max(height, 0);
                if (height > this.height) {
                    for (var x = 0; x < this.width; x++) {
                        for (var y = this.height; y < height; y++) {
                            this.pixelMap[x].push(new Pixel());
                        }
                    }
                } else if (height < this.height) {
                    for (var x = 0; x < this.width; x++) {
                        this.pixelMap[x].length = height;
                    }
                }
                this.height = height;
            }
        }, {
            key: "setDimensions",
            value: function setDimensions() {
                var width = arguments.length <= 0 || arguments[0] === undefined ? this.width : arguments[0];
                var height = arguments.length <= 1 || arguments[1] === undefined ? this.height : arguments[1];

                this.setWidth(width);
                this.setHeight(height);
            }
        }, {
            key: "setZ",
            value: function setZ(v) {
                if (_.isNumber(v) && !_.isNaN(v)) {
                    this.z = v;
                }
            }
        }]);

        return PixelLayer;
    })();

    module.exports = PixelLayer;
    return PixelLayer;
})();