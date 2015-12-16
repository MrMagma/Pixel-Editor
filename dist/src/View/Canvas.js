"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var mainContainer = document.getElementById("main-container");

var PixelCanvas = React.createClass({
    displayName: "PixelCanvas",
    render: function render() {
        return React.createElement("canvas", { style: {
                width: this.props.width,
                height: this.props.height
            } });
    }
});

var pCanvas = React.createElement(PixelCanvas, { width: "100px", height: "100px" });

ReactDOM.render(pCanvas, mainContainer);