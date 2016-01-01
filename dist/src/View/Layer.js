"use strict";

var PixelLayer = (function () {

    var React = require("react");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    // TODO (Joshua): Eventually make this a paintbrush or something.
    var PAINT_CURSOR = "pointer";

    // Gets the up to date state of the current PixelLayer component
    function getState() {
        var w = CanvasStore.getWidth(),
            h = CanvasStore.getHeight();
        return {
            canvasWidth: w,
            canvasHeight: h,
            canvasSize: Math.min(w, h)
        };
    }

    function getNodePos(node) {
        var pos = {
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
        displayName: "PixelLayer",
        getInitialState: function getInitialState() {
            return getState();
        },
        componentDidMount: function componentDidMount() {
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
            this.context = this.refs.node.getContext("2d");
        },
        componentWillUnmount: function componentWillUnmount() {
            CanvasStore.offDimensionChange({
                callback: this.handleChange
            });
            CanvasStore.onPixelChange({
                layerName: this.trueLayerName(),
                callback: this.handlePixelChange
            });
            document.removeEventListener("mouseup", this.endDrag);
        },
        componentDidUpdate: function componentDidUpdate() {
            this.paint();
        },
        render: function render() {
            return React.createElement("canvas", { ref: "node", style: {
                    position: "absolute",
                    top: 0,
                    left: 0
                }, width: this.props.pxSize, height: this.props.pxSize,
                onMouseDown: this.startDrag, onMouseMove: this.handleDrag,
                className: "pixel-canvas-layer" });
        },
        startDrag: function startDrag(evt) {
            // Store the previous cursor style of the body so we can reset it
            // later
            this.pBodyCursor = document.body.style.cursor;
            document.body.style.cursor = PAINT_CURSOR;
            this.setPixelFromEvent(evt);
            this.dragging = true;
        },
        endDrag: function endDrag() {
            // Reset the cursor
            document.body.style.cursor = this.pBodyCursor;
            this.dragging = false;
        },
        handleDrag: function handleDrag(evt) {
            if (this.dragging) {
                this.setPixelFromEvent(evt);
            }
        },
        handleChange: function handleChange() {
            this.setState(getState());
        },
        handlePixelChange: function handlePixelChange(_ref) {
            var x = _ref.x;
            var y = _ref.y;

            this.paintPixel(x, y);
        },
        trueLayerName: function trueLayerName() {
            return CanvasStore.getTrueLayerName(this.props.layerName);
        },
        setPixelFromEvent: function setPixelFromEvent(evt) {
            var offset = getNodePos(evt.target);
            var pos = {
                x: Math.floor((evt.pageX - offset.x) / this.props.pxSize * this.state.canvasWidth),
                y: Math.floor((evt.pageY - offset.y) / this.props.pxSize * this.state.canvasHeight)
            };
            this.setPixel(pos.x, pos.y);
        },
        setPixel: function setPixel(x, y) {
            CanvasDispatcher.dispatch({
                actionType: constants.SET_PIXEL,
                x: x,
                y: y,
                color: CanvasStore.getBrushColor()
            });
        },
        paintPixel: function paintPixel(canvasX, canvasY) {
            var pxSz = Math.floor(this.props.pxSize / this.state.canvasSize);
            this.context.clearRect(canvasX * pxSz, canvasY * pxSz, pxSz, pxSz);
            this.context.fillStyle = CanvasStore.getPixelHSL({
                x: canvasX,
                y: canvasY,
                layer: this.trueLayerName()
            });
            this.context.fillRect(canvasX * pxSz, canvasY * pxSz, pxSz, pxSz);
        },
        paint: function paint() {
            this.context.clearRect(0, 0, this.props.pxSize, this.props.pxSize);
            var w = this.state.canvasWidth,
                h = this.state.canvasHeight;
            for (var x = 0; x < w; x++) {
                for (var y = 0; y < h; y++) {
                    this.paintPixel(x, y);
                }
            }
        }
    });

    module.exports = PixelLayer;
    return PixelLayer;
})();