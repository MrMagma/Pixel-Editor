var PixelLayer = (function() {
    
    var React = require("react");
    var ReactDOM = require("react-dom");
    
    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");
    
    // Gets the up to date state of the current PixelLayer component
    function getState() {
        let w = CanvasStore.getWidth(), h = CanvasStore.getHeight();
        return {
            canvasWidth: w,
            canvasHeight: h,
            canvasSize: Math.min(w, h)
        };
    }
    
    function getNodePos(node) {
        let pos = {
            x: 0,
            y: 0
        };
        while (node) {
            pos.x += node.offsetLeft;
            pos.y += node.offsetTop;
            node = node.offsetParent;
        }
        return pos;
    }
    
    var PixelLayer = React.createClass({
        getInitialState() {
            return getState();
        },
        componentDidMount() {
            // TODO (Joshua): This is bad for the current layer, as at any
            // time it could be receiving changes from any layer. This should
            // be fixed soon.
            CanvasStore.onDimensionChange({
                callback: this.handleChange
            });
            CanvasStore.onPixelChange({
                layerName: this.trueLayerName(),
                callback: this.handlePixelChange
            });
            document.addEventListener("mouseup", this.endDrag);
            this.context = ReactDOM.findDOMNode(this).getContext("2d");
        },
        componentWillUnmount() {
            CanvasStore.offDimensionChange({
                callback: this.handleChange
            });
            CanvasStore.onPixelChange({
                layerName: this.trueLayerName(),
                callback: this.handlePixelChange
            });
            document.removeEventListener("mouseup", this.endDrag);
        },
        componentDidUpdate() {
            this.paint();
        },
        render() {
            return <canvas style={{
                position: "absolute",
                top: 0,
                left: 0
            }} width={this.props.pxSize} height={this.props.pxSize}
                onMouseDown={this.startDrag} onMouseMove={this.handleDrag}>
                </canvas>;
        },
        startDrag(evt) {
            this.setPixelFromEvent(evt);
            this.dragging = true;
        },
        endDrag() {
            this.dragging = false;
        },
        handleDrag(evt) {
            if (this.dragging) {
                this.setPixelFromEvent(evt);
            }
        },
        handleChange() {
            this.setState(getState());
        },
        handlePixelChange({x, y}) {
            this.paintPixel(x, y);
        },
        trueLayerName() {
            return CanvasStore.getTrueLayerName(this.props.layerName);            
        },
        setPixelFromEvent(evt) {
            let offset = getNodePos(evt.target);
            var pos = {
                x: Math.floor((evt.pageX - offset.x) / this.props.pxSize *
                    this.state.canvasWidth),
                y: Math.floor((evt.pageY - offset.y) / this.props.pxSize *
                    this.state.canvasHeight)
            };
            this.setPixel(pos.x, pos.y);
        },
        setPixel(x, y) {
            CanvasDispatcher.dispatch({
                actionType: constants.SET_PIXEL,
                x: x,
                y: y,
                color: [0, 0, 0, 1.0]
            });
        },
        paintPixel(canvasX, canvasY) {
            let pxSz = Math.floor(this.props.pxSize / this.state.canvasSize);
            this.context.clearRect(canvasX * pxSz, canvasY * pxSz, pxSz, pxSz);
            this.context.fillStyle = CanvasStore.getPixelRGB({
                x: canvasX,
                y: canvasY,
                layer: this.trueLayerName()
            });
            this.context.fillRect(canvasX * pxSz, canvasY * pxSz, pxSz, pxSz);
        },
        paint() {
            this.context.clearRect(0, 0, this.props.pxSize, this.props.pxSize);
            let w = this.state.canvasWidth, h = this.state.canvasHeight;
            for (let x = 0; x < w; x++) {
                for (let y = 0; y < h; y++) {
                    this.paintPixel(x, y);
                }
            }
        }
    });
    
    module.exports = PixelLayer;
    return PixelLayer;
    
})();
