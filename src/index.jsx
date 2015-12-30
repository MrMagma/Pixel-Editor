var React = require("react");
var ReactDOM = require("react-dom");

var PixelCanvas = require("./View/Canvas.jsx");
var ColorPicker = require("./View/ColorPicker.jsx");
var CanvasStore = require("./Stores/CanvasStore.js");
var CanvasDispatcher = require("./Dispatcher/CanvasDispatcher.js");
var constants = require("./Constants.js");

var mainContainer = document.getElementById("main-container");
var startBrush = CanvasStore.getBrushColor();

/* Begin sloppy stuff that will be removed in the near future and is currently
 just here for testing */
function onColorChange(color) {
    console.log("HI");
    CanvasDispatcher.dispatch({
        actionType: constants.SET_BRUSH,
        color: [color.hue, color.saturation,
            color.lightness, color.alpha]
    })
}

ReactDOM.render(
    <div>
        <PixelCanvas></PixelCanvas>
        <ColorPicker hue={startBrush[0]} saturation={startBrush[1]}
            lightness={startBrush[2]} alpha={startBrush[3]}
            onChange={onColorChange}></ColorPicker>
    </div>,
    mainContainer
);

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
