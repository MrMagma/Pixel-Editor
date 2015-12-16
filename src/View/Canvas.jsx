var React = require("react");
var ReactDOM = require("react-dom");

var mainContainer = document.getElementById("main-container");

var PixelCanvas = React.createClass({
    render() {
        return <canvas style={{
            width: this.props.width,
            height: this.props.height
        }}/>;
    }
});

var pCanvas = <PixelCanvas width="100px" height="100px"/>;

ReactDOM.render(
    pCanvas,
    mainContainer
);
