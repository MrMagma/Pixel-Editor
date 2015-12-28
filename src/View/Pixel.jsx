var Pixel = (function() {
    
    var React = require("react");

    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var constants = require("../Constants.js");

    var Pixel = React.createClass({
        getInitialState() {
            return {
                color: CanvasStore.getPixelRGB({
                    x: this.props.canvasX,
                    y: this.props.canvasY,
                    layer: this.props.layerName
                })
            };
        },
        componentDidMount() {
            // Add a listener on the store for changes on the pixel that this
            // component represents
            CanvasStore.onPixelChange({
                layerName: this.props.layerName,
                x: this.props.canvasX,
                y: this.props.canvasY,
                callback: this.handleChange
            });
        },
        componentWillUnmount() {
            // Unbind all of the listeners this component has created and do
            // general clean up
            CanvasStore.offPixelChange({
                layerName: this.props.layerName,
                x: this.props.canvasX,
                y: this.props.canvasY,
                callback: this.handleChange
            });
        },
        render() {
            return <div style={{
                display: "inline-block",
                position: "absolute",
                top: this.props.canvasX * this.props.pxSize,
                left: this.props.canvasY * this.props.pxSize,
                width: this.props.pxSize,
                height: this.props.pxSize,
                background: CanvasStore.getPixelRGB({
                    x: this.props.canvasX,
                    y: this.props.canvasY,
                    layer: this.props.layerName
                })
            }} onClick={this.handleClick}></div>
        },
        handleClick() {
            // Handle any click events on this Pixel, passing them to the
            // dispatcher to set the pixel represented by this component
            CanvasDispatcher.dispatch({
                actionType: constants.SET_PIXEL,
                x: this.props.canvasX,
                y: this.props.canvasY,
                layerName: this.props.layerName,
                // TODO (Joshua): Use the active brush color (from the store)
                // here
                color: [0, 0, 0, 1.0]
            });
        },
        handleChange() {
            // This method should be called whenever the pixel that this
            // Component represents is changed, so update our shtuff.
            this.setState({
                color: CanvasStore.getPixelRGB({
                    x: this.props.canvasX,
                    y: this.props.canvasY,
                    layer: this.props.layerName
                })
            });
        }
    });
    
    module.exports = Pixel;
    return Pixel;
    
})();
