"use strict";

var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var PixelLayer = require("./Layer.jsx");

var mainContainer = document.getElementById("main-container");

var PixelCanvas = React.createClass({
    displayName: "PixelCanvas",
    getDefaultProps: function getDefaultProps() {
        return {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        };
    },
    componentWillMount: function componentWillMount() {
        window.addEventListener("resize", this.handleResize);
    },
    componentDidMount: function componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.updateDimensions();
    },
    componentWillUnmount: function componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    render: function render() {
        var _this = this;

        this.numLayers = 0;
        var layers = CanvasStore.getLayers();
        return React.createElement(
            "div",
            { style: {
                    position: "absolute",
                    top: this.props.y,
                    left: this.props.x,
                    width: this.props.width,
                    height: this.props.height
                } },
            layers.map(function (layer, index) {
                var ret = React.createElement(PixelLayer, { key: index, ref: "layer-" + index, layerName: layer });
                _this.numLayers++;
                return ret;
            }),
            React.createElement(PixelLayer, { layerName: "current", ref: "layer-" + this.numLayers++ })
        );
    },
    handleResize: function handleResize() {
        if (!this.resizeTimeout) {
            this.resizeTimeout = setTimeout(this.updateDimensions, 1000);
        }
    },
    updateDimensions: function updateDimensions() {
        this.dim = {
            width: this.node.offsetWidth,
            height: this.node.offsetHeight
        };

        for (var i = 0; i < this.numLayers; ++i) {
            this.refs["layer-" + i].updateDimensions({ parent: this });
        }

        this.resizeTimeout = false;
    }
});

ReactDOM.render(React.createElement(PixelCanvas, null), mainContainer);