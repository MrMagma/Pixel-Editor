"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = require("./Pixel.jsx");

function getState() {
    return {
        canvasWidth: CanvasStore.getWidth(),
        canvasHeight: CanvasStore.getHeight()
    };
}

var PixelLayer = React.createClass({
    displayName: "PixelLayer",
    getInitialState: function getInitialState() {
        return getState();
    },
    render: function render() {
        var children = [];
        var w = this.state.canvasWidth,
            h = this.state.canvasHeight,
            numPixels = w * h;
        for (var i = 0; i < numPixels; i++) {
            var x = i % w;
            var y = Math.floor(i / w);
            children.push(React.createElement(Pixel, { x: x, y: y, key: i, ref: "pixel-" + x + "-" + y }));
        }
        return React.createElement(
            "div",
            { style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                } },
            children
        );
    },
    updateDimensions: function updateDimensions(_ref) {
        var _ref$parent = _ref.parent;
        var parent = _ref$parent === undefined ? this : _ref$parent;

        this.dim = parent.dim;
        var size = Math.min(this.dim.width, this.dim.height);
        for (var x = 0; x < this.state.canvasWidth; x++) {
            for (var y = 0; y < this.state.canvasHeight; y++) {
                this.refs["pixel-" + x + "-" + y].setDimensions({
                    width: size / this.state.canvasWidth,
                    height: size / this.state.canvasHeight
                });
            }
        }
    }
});

module.exports = PixelLayer;