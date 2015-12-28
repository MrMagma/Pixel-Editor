"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PixelImage = (function () {

    var PixelLayer = require("./PixelLayer.js");
    var _ = require("underscore");

    var PixelImage = (function () {
        function PixelImage() {
            _classCallCheck(this, PixelImage);

            this.currentLayer = "main";
            this.layers = {
                main: new PixelLayer({
                    name: "main"
                })
            };

            Object.defineProperty(this.layers, "current", {
                get: (function () {
                    return this.layers[this.currentLayer];
                }).bind(this)
            });

            this.width = this.layers.main.width;
            this.height = this.layers.main.height;

            this.layerNames = ["main"];
        }

        _createClass(PixelImage, [{
            key: "validLayerName",
            value: function validLayerName(name) {
                return _.isString(name) && name !== "current" && this.layerNames.indexOf(name) === -1;
            }
        }, {
            key: "addLayer",
            value: function addLayer(name) {
                if (this.validLayerName(name)) {
                    this.layers[name] = new PixelLayer({
                        name: name
                    });
                }
            }
        }, {
            key: "getLayer",
            value: function getLayer() {
                var name = arguments.length <= 0 || arguments[0] === undefined ? "current" : arguments[0];

                return this.layers[name];
            }
        }, {
            key: "getLayers",
            value: function getLayers() {
                return this.layerNames;
            }
        }, {
            key: "setDimensions",
            value: function setDimensions(_ref) {
                var _ref$width = _ref.width;
                var width = _ref$width === undefined ? this.width : _ref$width;
                var _ref$height = _ref.height;
                var height = _ref$height === undefined ? this.height : _ref$height;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.layerNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var layerName = _step.value;

                        this.layers[layerName].setDimensions(width, height);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this.width = width;
                this.height = height;
            }
        }, {
            key: "getDimensions",
            value: function getDimensions() {
                return {
                    width: this.width,
                    height: this.height
                };
            }
        }]);

        return PixelImage;
    })();

    module.exports = PixelImage;
    return PixelImage;
})();