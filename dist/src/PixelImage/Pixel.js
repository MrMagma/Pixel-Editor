"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = require("./Color.js");

var Pixel = (function () {
    function Pixel() {
        _classCallCheck(this, Pixel);

        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 0.0;
    }

    _createClass(Pixel, [{
        key: "getRGB",
        value: function getRGB() {
            return this.rgb;
        }
    }, {
        key: "rgb",
        get: function get() {
            return "rgba(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")";
        }
    }]);

    return Pixel;
})();

module.exports = Pixel;