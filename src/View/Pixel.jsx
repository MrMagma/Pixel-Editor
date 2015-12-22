var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var Pixel = React.createClass({
    render() {
        return <span>A</span>
    }
});

module.exports = Pixel;
