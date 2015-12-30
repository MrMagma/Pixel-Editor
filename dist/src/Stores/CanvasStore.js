"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var CanvasStore = (function () {

    var EventEmitter = require('events').EventEmitter;
    var _ = require("underscore");

    var constants = require("../Constants.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var PixelImage = require("../PixelImage/PixelImage.js");

    var IMAGE_CHANGE_PREFIX = "imageChange";
    var LAYER_CHANGE_PREFIX = "layerChange";
    var BRUSH_CHANGE_EVENT = "brushChange";

    var pixelImage = new PixelImage();
    var brushColor = [0, 0, 0, 1.0];

    var CanvasStore = {
        getLayers: function getLayers() {
            return pixelImage.getLayers();
        },
        getTrueLayerName: function getTrueLayerName(layerName) {
            return pixelImage.getLayer(layerName).layerName;
        },
        getWidth: function getWidth() {
            return pixelImage.width;
        },
        getHeight: function getHeight() {
            return pixelImage.height;
        },
        getPixelHSL: function getPixelHSL() {
            var cfg = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var x = cfg.x;
            var y = cfg.y;
            var _cfg$layer = cfg.layer;
            var layer = _cfg$layer === undefined ? "current" : _cfg$layer;

            if (_.isNumber(x) && !_.isNaN(x) && _.isNumber(y) && !_.isNaN(y)) {
                return pixelImage.getLayer(layer).getPixel(x, y).getHSL();
            } else {
                throw new TypeError("Coordinates must be numbers and not NaN");
            }
        },
        getDimensions: function getDimensions() {
            return pixelImage.getDimensions();
        },
        getBrushColor: function getBrushColor() {
            return [brushColor[0], brushColor[1], brushColor[2], brushColor[3]];
        },
        setPixel: function setPixel(action) {
            var layerName = action.layerName;
            var x = action.x;
            var y = action.y;

            var layer = pixelImage.getLayer(layerName),
                pixel = layer.getPixel(x, y);
            var originalHSL = pixel.getHSL();
            layer.setPixelHSL(action);
            // Do this because we don't want to say a pixel has been changed
            // if nothing actually changed as that would trigger a render and
            // rendering is expensive.
            if (pixel.getHSL() !== originalHSL) {
                this.emitPixelChange({
                    x: x,
                    y: y,
                    layerName: layer.layerName
                });
            }
        },
        setDimensions: function setDimensions(action) {
            pixelImage.setDimensions(action);
            this.emitDimensionChange();
        },
        setBrushColor: function setBrushColor(_ref) {
            var color = _ref.color;

            var _color = _slicedToArray(color, 4);

            var h = _color[0];
            var s = _color[1];
            var l = _color[2];
            var _color$ = _color[3];
            var a = _color$ === undefined ? brushColor[3] : _color$;

            brushColor[0] = h;
            brushColor[1] = s;
            brushColor[2] = l;
            brushColor[3] = a;
            this.emitBrushChange();
        }
    };

    _.extendOwn(CanvasStore, EventEmitter.prototype, {
        // Maybe make things just able to listen for changes in a layer, and
        // then leave it up to the listener to determine if the event was
        // relevant to them

        onPixelChange: function onPixelChange(_ref2) {
            var layerName = _ref2.layerName;
            var callback = _ref2.callback;

            this.on(LAYER_CHANGE_PREFIX + "_" + layerName, callback);
        },
        offPixelChange: function offPixelChange(_ref3) {
            var layerName = _ref3.layerName;
            var callback = _ref3.callback;

            this.removeListener(LAYER_CHANGE_PREFIX + "_" + layerName, callback);
        },
        onDimensionChange: function onDimensionChange(_ref4) {
            var callback = _ref4.callback;

            this.on(IMAGE_CHANGE_PREFIX + "_dimensionChange", callback);
        },
        offDimensionChange: function offDimensionChange(_ref5) {
            var callback = _ref5.callback;

            this.removeListener(IMAGE_CHANGE_PREFIX + "_dimensionChange", callback);
        },
        onBrushChange: function onBrushChange(_ref6) {
            var callback = _ref6.callback;

            this.on(BRUSH_CHANGE_EVENT, callback);
        },
        offBrushChange: function offBrushChange(_ref7) {
            var callback = _ref7.callback;

            this.removeListener(BRUSH_CHANGE_EVENT, callback);
        },
        emitPixelChange: function emitPixelChange(_ref8) {
            var x = _ref8.x;
            var y = _ref8.y;
            var layerName = _ref8.layerName;

            this.emit(LAYER_CHANGE_PREFIX + "_" + layerName, {
                x: x,
                y: y
            });
        },
        emitDimensionChange: function emitDimensionChange() {
            this.emit(IMAGE_CHANGE_PREFIX + "_dimensionChange");
        },
        emitBrushChange: function emitBrushChange() {
            this.emit(BRUSH_CHANGE_EVENT);
        }
    });

    CanvasDispatcher.register(function (action) {
        switch (action.actionType) {
            case constants.SET_PIXEL:
                CanvasStore.setPixel(action);
                break;
            case constants.SET_DIMENSIONS:
                CanvasStore.setDimensions(action);
                break;
            case constants.SET_BRUSH:
                CanvasStore.setBrushColor(action);
                break;
            default:
        }
    });

    module.exports = CanvasStore;
    return CanvasStore;
})();