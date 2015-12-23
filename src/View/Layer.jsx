var React = require("react");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = require("./Pixel.jsx");

function getState() {
    return {
        canvasWidth: CanvasStore.getWidth(),
        canvasHeight: CanvasStore.getHeight()
    };
}

var PixelLayer = React.createClass({
    getInitialState() {
        return getState();
    },
    render() {
        let children = [];
        let w = this.state.canvasWidth, h = this.state.canvasHeight,
            numPixels = w * h;
        for (let i = 0; i < numPixels; i++) {
            let x = i % w;
            let y = Math.floor(i / w);
            children.push(<Pixel canvasX={x} canvasY={y}
                layerName={this.props.layerName} key={i}
                ref={`pixel-${x}-${y}`}/>);
        }
        return <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }}>{children}</div>
    },
    updateDimensions({parent = this}) {
        this.dim = parent.dim;
        let size = Math.min(this.dim.width, this.dim.height);
        for (let x = 0; x < this.state.canvasWidth; x++) {
            for (let y = 0; y < this.state.canvasHeight; y++) {
                this.refs[`pixel-${x}-${y}`].setDimensions({
                    width: size / this.state.canvasWidth,
                    height: size / this.state.canvasHeight
                });
            }
        }
    }
});

module.exports = PixelLayer;
