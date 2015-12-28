"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var Canvas = require("./View/Canvas.jsx");
var CanvasStore = require("./Stores/CanvasStore.js");

var mainContainer = document.getElementById("main-container");

ReactDOM.render(React.createElement(Canvas, null), mainContainer);

function onClick() {
    var curDim = CanvasStore.getDimensions();
    CanvasStore.setDimensions({
        width: curDim.width + 1,
        height: curDim.height + 1
    });
}

document.getElementById("btn").addEventListener("click", onClick);