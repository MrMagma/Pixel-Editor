"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var Canvas = require("./View/Canvas.jsx");
var CanvasStore = require("./Stores/CanvasStore.js");

var mainContainer = document.getElementById("main-container");

ReactDOM.render(React.createElement(Canvas, null), mainContainer);

function increaseSz() {
    var curDim = CanvasStore.getDimensions();
    CanvasStore.setDimensions({
        width: curDim.width + 1,
        height: curDim.height + 1
    });
}

function decreaseSz() {
    var curDim = CanvasStore.getDimensions();
    CanvasStore.setDimensions({
        width: curDim.width - 1,
        height: curDim.height - 1
    });
}

document.getElementById("increase").addEventListener("click", increaseSz);
document.getElementById("decrease").addEventListener("click", decreaseSz);