var React = require("react");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = React.createClass({
    getInitialState() {
        return {
            width: 1,
            height: 1
        }
    },
    setDimensions(dim = {}) {
        let {width, height} = dim;
        this.setState({
            width: width,
            height: height
        });
    },
    render() {
        return <div style={{
            display: "inline-block",
            position: "absolute",
            top: this.props.canvasX * this.state.width,
            left: this.props.canvasY * this.state.height,
            width: this.state.width,
            height: this.state.height,
            background: CanvasStore.getPixelRGB({
                x: this.props.canvasX,
                y: this.props.canvasY,
                layer: this.props.layerName
            })
        }}></div>
    },
    handleClick() {
        
    }
});

module.exports = Pixel;
