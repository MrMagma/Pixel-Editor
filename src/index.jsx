var React = require("react");
var ReactDOM = require("react-dom");

var Canvas = require("./View/Canvas.jsx");
var CanvasStore = require("./Stores/CanvasStore.js");

var mainContainer = document.getElementById("main-container");

ReactDOM.render(
    <Canvas></Canvas>,
    mainContainer
);

/* Begin sloppy stuff that will be removed in the near future and is currently
 just here for testing */
// Limit all size increases to 128, as beyond that performance can become
// rather iffy.
function increaseSz() {
    var curDim = CanvasStore.getDimensions();
    CanvasStore.setDimensions({
        width: curDim.width + 1,
        height: curDim.height + 1
    });
    document.getElementById("sz").textContent = `${curDim.width + 1}x${curDim.height + 1}`
}

function decreaseSz() {
    var curDim = CanvasStore.getDimensions();
    CanvasStore.setDimensions({
        width: curDim.width - 1,
        height: curDim.height - 1
    });
    document.getElementById("sz").textContent = `${curDim.width - 1}x${curDim.height - 1}`
}

document.getElementById("increase").addEventListener("click", increaseSz);
document.getElementById("decrease").addEventListener("click", decreaseSz);

/* End sloppy stuff that will be removed in the near future and is currently
 just here for testing */
