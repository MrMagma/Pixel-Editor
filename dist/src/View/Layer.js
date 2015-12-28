"use strict";

var PixelLayer = (function () {

    var React = require("react");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    var Pixel = require("./Pixel.jsx");

    // Gets the up to date state of the current PixelLayer component
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
        componentDidMount: function componentDidMount() {
            CanvasStore.onDimensionChange({
                callback: this.handleChange
            });
        },
        componentWillUnmount: function componentWillUnmount() {
            CanvasStore.offDimensionChange({
                callback: this.handleChange
            });
        },
        render: function render() {
            var children = [];
            var w = this.state.canvasWidth,
                h = this.state.canvasHeight;

            // Add one Pixel component for every pixel on this layer to the
            // array of children to render
            var pxSize = this.props.pxSize / Math.min(w, h);
            for (var x = 0; x < w; x++) {
                for (var y = 0; y < h; y++) {
                    children.push(React.createElement(Pixel, { canvasX: x, canvasY: y, pxSize: pxSize,
                        layerName: this.trueLayerName(), key: x + w * y,
                        ref: "pixel-" + x + "-" + y }));
                }
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
        handleChange: function handleChange() {
            this.setState(getState());
        },
        trueLayerName: function trueLayerName() {
            return CanvasStore.getTrueLayerName(this.props.layerName);
        }
    });

    module.exports = PixelLayer;
    return PixelLayer;
})();