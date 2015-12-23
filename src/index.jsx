var React = require("react");
var ReactDOM = require("react-dom");

var Canvas = require("./View/Canvas.jsx");

var mainContainer = document.getElementById("main-container");

ReactDOM.render(
    <Canvas/>,
    mainContainer
);
