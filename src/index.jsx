require("babel-polyfill");

var React = require("react");
var ReactDOM = require("react-dom");

var PixelCanvas = require("./Components/Canvas.jsx");
var ColorPicker = require("./Components/ColorPicker.jsx");
var CanvasStore = require("./Stores/CanvasStore.js");
var CanvasDispatcher = require("./Dispatcher/CanvasDispatcher.js");
var constants = require("./Constants.js");

var mainContainer = document.getElementById("main-container");
var startBrush = CanvasStore.getBrushColor();

/* Begin sloppy stuff that will be removed in the near future and is currently
 just here for testing */
function onColorChange(color) {
    CanvasDispatcher.dispatch({
        actionType: constants.SET_BRUSH,
        color: [color.hue, color.saturation,
            color.lightness, color.alpha]
    })
}

ReactDOM.render(
    <div>
        <PixelCanvas></PixelCanvas>
        <div className="pixel-ui-right-side-controls">
            <ColorPicker class="pixel-ui-box" style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 250,
                    height: 250
                }} hue={startBrush[0]} saturation={startBrush[1]}
                lightness={startBrush[2]} alpha={startBrush[3]}
                onChange={onColorChange} x="1em" y="1em"></ColorPicker>
        </div>
    </div>,
    mainContainer
);

// NOTE (Joshua): Limit all size increases to 128, as beyond that performance
// can become rather iffy.

/* End sloppy stuff that will be removed in the near future and is currently
 just here for testing */
