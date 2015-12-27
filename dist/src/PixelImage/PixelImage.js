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
        }

        _createClass(PixelImage, [{
            key: "validLayerName",
            value: function validLayerName(name) {
                return _.isString(name) && name !== "current";
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
                var layerNames = [];
                for (var key in this.layers) {
                    if (this.layers.hasOwnProperty(key) && key !== "current") {
                        layerNames.push(key);
                    }
                }
                return layerNames;
            }
        }]);

        return PixelImage;
    })();

    module.exports = PixelImage;
    return PixelImage;
})();