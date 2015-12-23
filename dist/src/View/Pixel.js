"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = React.createClass({
    displayName: "Pixel",
    getInitialState: function getInitialState() {
        return {
            width: 1,
            height: 1,
            color: "rgba(0, 0, 0, 1)"
        };
    },
    setDimensions: function setDimensions() {
        var dim = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
                top: this.props.x * this.state.width,
                left: this.props.y * this.state.height,
                width: this.state.width,
                height: this.state.height,
                background: this.state.color
            } });
    }
});

module.exports = Pixel;