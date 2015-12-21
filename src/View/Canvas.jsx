var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var mainContainer = document.getElementById("main-container");

function getClientOffset(element) {
    var xPosition = 0;
    var yPosition = 0;
      
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

function getState() {
    return {
        pixels: CanvasStore.getFlattened(),
        width: CanvasStore.getWidth(),
        height: CanvasStore.getHeight()
    }
}

var PixelCanvas = React.createClass({
    getInitialState() {
        return getState();
    },
    componentDidMount() {
        CanvasStore.onPixelChange(this._onChange);
        this.update();
    },
    componentWillUnmount() {
        CanvasStore.offPixelChange(this._onChange);
    },
    componentDidUpdate() {
        this.update();
    },
    handleClick(evt) {
        var coords = {
            x: evt.clientX - this.clientOffset.x,
            y: evt.clientY - this.clientOffset.y
        };

        CanvasDispatcher.dispatch({
            action: constants.setPixel,
            x: Math.floor(coords.x / this.state.width),
            y: Math.floor(coords.y / this.state.height),
            color: 0x000000
        });
    },
    render() {
        return <canvas style={{
            width: this.props.width,
            height: this.props.height
        }} onClick={this.handleClick}/>;
    },
    update() {
        this.node = ReactDOM.findDOMNode(this);
        this.clientOffset = getClientOffset(this.node);
        this.updateCanvas();
    },
    paint(ctx) {
        ctx.save();
        ctx.translate(100, 100);
        ctx.rotate(this.props.rotation, 100, 100);
        ctx.fillStyle = '#F00';
        ctx.fillRect(-50, -50, 100, 100);
        ctx.restore();
    },
    updateCanvas() {
        var context = this.node.getContext("2d");
        this.paint(context);
    },
    _onChange() {
        this.setState(getState());
    }
});

var pCanvas = <PixelCanvas width="400px" height="400px"/>;

ReactDOM.render(
    pCanvas,
    mainContainer
);
