"use strict";

var PixelCanvas = (function () {

    var React = require("react");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    var PixelLayer = require("./Layer.jsx");
    var CheckerBoard = require("./CheckerBoard.jsx");

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
        getInitialState: function getInitialState() {
            return {
                pxSize: 1,
                canvasWidth: CanvasStore.getWidth(),
                canvasHeight: CanvasStore.getHeight()
            };
        },
        componentDidMount: function componentDidMount() {
            // Listen for resize events
            window.addEventListener("resize", this.handleResize);
            CanvasStore.onDimensionChange({
                callback: this.handleDimChange
            });
            this.updateDimensions();
        },
        componentWillUnmount: function componentWillUnmount() {
            // We don't need our listener any more if we're no longer on the DOM
            window.removeEventListener("resize", this.handleResize);
            CanvasStore.offDimensionChange({
                callback: this.handleDimChange
            });
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
                { ref: "node", style: {
                        position: "absolute",
                        top: this.props.y,
                        left: this.props.x,
                        width: this.props.width,
                        height: this.props.height
                    } },
                React.createElement(CheckerBoard, { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: this.state.pxSize,
                        height: this.state.pxSize
                    },
                    rows: this.state.canvasWidth * 2,
                    columns: this.state.canvasHeight * 2 }),
                layers.map(function (layer, index) {
                    var ret = React.createElement(PixelLayer, { key: index, ref: "layer-" + index,
                        layerName: layer, pxSize: _this.state.pxSize });
                    _this.numLayers++;
                    return ret;
                }),
                React.createElement(PixelLayer, { layerName: "current",
                    ref: "layer-" + this.numLayers++,
                    pxSize: this.state.pxSize,
                    noRender: true })
            );
        },
        handleResize: function handleResize() {
            // If we haven't already set a timeout to handle the resize event,
            // then set it to 1 second
            if (!this.resizeTimeout) {
                this.resizeTimeout = setTimeout(this.updateDimensions, 1000);
            }
        },
        handleDimChange: function handleDimChange() {
            this.setState({
                canvasWidth: CanvasStore.getWidth(),
                canvasHeight: CanvasStore.getHeight()
            });
        },
        updateDimensions: function updateDimensions() {
            // Update our stored size.
            this.setState({
                pxSize: Math.min(this.refs.node.offsetWidth, this.refs.node.offsetHeight)
            });

            // Clear the resize timeout
            this.resizeTimeout = false;
        }
    });

    module.exports = PixelCanvas;
    return PixelCanvas;
})();