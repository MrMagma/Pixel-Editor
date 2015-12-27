"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pixel = (function () {
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
            key: "setRGB",
            value: function setRGB(_ref) {
                var _ref2 = _slicedToArray(_ref, 4);

                var r = _ref2[0];
                var g = _ref2[1];
                var b = _ref2[2];
                var _ref2$ = _ref2[3];
                var a = _ref2$ === undefined ? 1.0 : _ref2$;

                this.red = r;
                this.green = g;
                this.blue = b;
                this.alpha = a;
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
    return Pixel;
})();