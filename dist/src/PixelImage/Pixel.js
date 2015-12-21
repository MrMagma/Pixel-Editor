"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Color = require("./Color.js");

var Pixel = (function () {
    function Pixel() {
        _classCallCheck(this, Pixel);

        this.color = 0x000000;
        this.alpha = 0.0;
    }

    _createClass(Pixel, [{
        key: "setColor",
        value: function setColor() {
            var color = arguments.length <= 0 || arguments[0] === undefined ? this.color : arguments[0];

            this.color = color;
        }
    }, {
        key: "setAlpha",
        value: function setAlpha() {
            var alpha = arguments.length <= 0 || arguments[0] === undefined ? this.alpha : arguments[0];

            this.alpha = alpha;
        }
    }]);

    return Pixel;
})();

module.exports = Pixel;