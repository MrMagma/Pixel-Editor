"use strict";

var Pixel = (function () {

    var React = require("react");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    var Pixel = React.createClass({
        displayName: "Pixel",
        getInitialState: function getInitialState() {
            return {
                width: 1,
                height: 1,
                color: "rgba(0, 0, 0, 0)"
            };
        },
        componentDidMount: function componentDidMount() {
            // TODO (Joshua): Add a listener on the store for changes on the
            // pixel that this component represents
        },
        componentWillUnmount: function componentWillUnmount() {
            // TODO (Joshua): Unbind all of the listeners this component has
            // created and do general clean up
        },
        setDimensions: function setDimensions() {
            var dim = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            // Set the width and height of this Pixel in screen pixels.
            // Used when the window/canvas is resized.
            var width = dim.width;
            var height = dim.height;

            this.setState({
                width: width,
                height: height
            });
        },
        render: function render() {
            return React.createElement("div", { style: {
                    display: "inline-block",
                    position: "absolute",
                    top: this.props.canvasX * this.state.width,
                    left: this.props.canvasY * this.state.height,
                    width: this.state.width,
                    height: this.state.height,
                    background: this.state.color
                }, onClick: this.handleClick });
        },
        handleClick: function handleClick() {
            // Handle any click events on this Pixel, passing them to the store
            // to set the pixel represented by this component
        },
        _onChange: function _onChange() {
            // This method should be called whenever the pixel that this
            // Component represents is changed, so update our shtuff.
            this.setState({
                color: CanvasStore.getPixelRGB({
                    x: this.props.canvasX,
                    y: this.props.canvasY,
                    layer: this.props.layerName
                })
            });
        }
    });

    return Pixel;
})();

module.exports = Pixel;