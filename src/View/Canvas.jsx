var React = require("react");
var ReactDOM = require("react-dom");

var CanvasStore = require("../Stores/CanvasStore.js");
var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var constants = require("../Constants.js");

var PixelLayer = require("./Layer.jsx");

var mainContainer = document.getElementById("main-container");

var PixelCanvas = React.createClass({
    getDefaultProps() {
        return {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
        };
    },
    componentWillMount() {
        window.addEventListener("resize", this.handleResize);
    },
    componentDidMount() {
        this.node = ReactDOM.findDOMNode(this);
        this.updateDimensions();
    },
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    },
    render() {
        this.numLayers = 0;
        let layers = CanvasStore.getLayers();
        return <div style={{
            position: "absolute",
            top: this.props.y,
            left: this.props.x,
            width: this.props.width,
            height: this.props.height
        }}>
            {layers.map((layer, index) => {
                let ret = <PixelLayer key={index} ref={`layer-${index}`} layerName={layer}/>;
                this.numLayers++;
                return ret;
            })}
            <PixelLayer layerName="current" ref={`layer-${this.numLayers++}`}/>
        </div>
    },
    handleResize() {
        if (!this.resizeTimeout) {
            setTimeout(this.updateDimensions, 500);
        }
    },
    updateDimensions() {
        this.dim = {
            width: this.node.scrollWidth,
            height: this.node.scrollHeight
        };
        
        for (let i = 0; i < this.numLayers; ++i) {
            this.refs[`layer-${i}`].updateDimensions({parent: this});
        }
    }
});

ReactDOM.render(
    <PixelCanvas/>,
    mainContainer
)
