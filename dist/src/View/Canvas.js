"use strict";

var PixelCanvas = (function () {

    var React = require("react");
    var ReactDOM = require("react-dom");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    var PixelLayer = require("./Layer.jsx");

    /*
     The PixelCanvas component represents one pixel image. It is composed of
     multiple PixelLayer components each representing a single layer in the image.
     The PixelCanvas handles resize events for all elements on the canvas, calling
     handler methods on itself and its children.
     */
    var PixelCanvas = React.createClass({
        displayName: "PixelCanvas",
        getDefaultProps: function getDefaultProps() {
            return {
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            };
        },
        componentWillMount: function componentWillMount() {
            // Listen for resize events
            window.addEventListener("resize", this.handleResize);
        },
        componentDidMount: function componentDidMount() {
            // Get the DOM node associated with this component so we can do stuff,
            // and update our dimensions
            this.node = ReactDOM.findDOMNode(this);
            this.updateDimensions();
        },
        componentWillUnmount: function componentWillUnmount() {
            // We don't need our listener any more if we're no longer on the DOM
            window.removeEventListener("resize", this.handleResize);
        },
        render: function render() {
            var _this = this;

            // Reset the numLayers data
            this.numLayers = 0;

            var layers = CanvasStore.getLayers();

            // Render a div with one child PixelLayer for every layer, and an extra
            // one for whatever layer is active at any point in time
            return React.createElement(
                "div",
                { style: {
                        position: "absolute",
                        top: this.props.y,
                        left: this.props.x,
                        width: this.props.width,
                        height: this.props.height
                    } },
                layers.map(function (layer, index) {
                    var ret = React.createElement(PixelLayer, { key: index, ref: "layer-" + index, layerName: layer });
                    _this.numLayers++;
                    return ret;
                }),
                React.createElement(PixelLayer, { layerName: "current", ref: "layer-" + this.numLayers++ })
            );
        },
        handleResize: function handleResize() {
            // If we haven't already set a timeout to handle the resize event, then
            // set it to 1 second
            if (!this.resizeTimeout) {
                this.resizeTimeout = setTimeout(this.updateDimensions, 1000);
            }
        },
        updateDimensions: function updateDimensions() {
            // Update our stored dimensions.
            this.dim = {
                width: this.node.offsetWidth,
                height: this.node.offsetHeight
            };

            // Update the dimensions of our child elements
            for (var i = 0; i < this.numLayers; ++i) {
                this.refs["layer-" + i].updateDimensions({ parent: this });
            }

            // Clear the resize timeout
            this.resizeTimeout = false;
        }
    });

    module.exports = PixelCanvas;
    return PixelCanvas;
})();