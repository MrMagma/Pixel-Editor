"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixel = (function () {
    function Pixel() {
        _classCallCheck(this, Pixel);

        this.hue = 0;
        this.saturation = 0;
        this.brightness = 0;
        this.alpha = 1.0;
    }

    _createClass(Pixel, [{
        key: "red",
        get: function get() {
            // TODO (Joshua): Implement
        },
        set: function set(v) {
            // TODO (Joshua): Implement       
        }
    }, {
        key: "green",
        get: function get() {
            // TODO (Joshua): Implement
        },
        set: function set(v) {
            // TODO (Joshua): Implement
        }
    }, {
        key: "blue",
        get: function get() {
            // TODO (Joshua): Implement
        },
        set: function set(v) {
            // TODO (Joshua): Implement
        }
    }]);

    return Pixel;
})();

module.exports = Pixel;