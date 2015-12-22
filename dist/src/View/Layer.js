"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = require("./Pixel.jsx");

var PixelLayer = React.createClass({
    displayName: "PixelLayer",
    render: function render() {
        return React.createElement("div", { style: {
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            } });
    },
    updateDimensions: function updateDimensions(_ref) {
        var _ref$parent = _ref.parent;
        var parent = _ref$parent === undefined ? this : _ref$parent;

        this.dim = parent.dim;
        var size = Math.min(this.dim.width, this.dim.height);
    }
});

module.exports = PixelLayer;