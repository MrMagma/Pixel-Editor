var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = require("./Pixel.jsx");

var PixelLayer = React.createClass({
    render() {
        return <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }}>{}</div>
    },
    updateDimensions({parent = this}) {
        this.dim = parent.dim;
        let size = Math.min(this.dim.width, this.dim.height);
    }
});

module.exports = PixelLayer;
