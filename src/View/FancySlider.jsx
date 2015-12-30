var FancySlider = (function() {
    
    var React = require("react");
    var ReactDOM = require("react-dom");
    
    var dragging = false;
    var lastDragUpdate = -Infinity;
    
    const MIN_DRAG_INTERVAL = 5;
    var uid = 0;
    
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
    
    var FancySlider = React.createClass({
        getDefaultProps() {
            return {
                minX: 0,
                maxX: 0,
                minY: 0,
                maxY: 0,
                knobStyle: {},
                trackStyle: {},
                onChange() {},
                onDragStart() {},
                onDragEnd() {}
            }
        },
        getInitialState() {
            return {
                valueX: (this.props.valueX !== undefined) ?
                    this.props.valueX : this.props.minX,
                valueY: (this.props.valueY !== undefined) ?
                    this.props.valueY : this.props.minY
            }
        },
        componentDidMount() {
            this.uid = ++uid;
            window.addEventListener("mouseup", this.endDrag);
            window.addEventListener("mousemove", this.handleDrag);
            this.node = ReactDOM.findDOMNode(this);
        },
        componentWillUnmount() {
            window.removeEventListener("mouseup", this.endDrag);
            window.removeEventListener("mousemove", this.handleDrag);
        },
        render() {
            return <div style={this.props.trackStyle}
                onMouseDown={this.startDrag}>
                <div style={{
                    top: ((this.state.valueY - this.props.minY) /
                        (this.props.maxY - this.props.minY) *
                        100 || 0) + "%",
                    left: ((this.state.valueX - this.props.minX) /
                        (this.props.maxX - this.props.minX) *
                        100 || 0) + "%",
                    position: "absolute"
                }}>
                    <div style={this.props.knobStyle}></div>
                </div>
            </div>
        },
        startDrag(evt) {
            if (!dragging) {
                dragging = this;
                lastDragUpdate = -Infinity;
                this.props.onDragStart();
                this.updateKnob(evt);
            }
        },
        handleDrag(evt) {
            if (dragging && dragging.uid === this.uid) {
                this.updateKnob(evt);
            }
        },
        endDrag() {
            if (dragging) {
                this.props.onDragEnd();
                dragging = false;
            }
        },
        updateKnob(evt) {
            evt.preventDefault();
            if (Date.now() - lastDragUpdate > MIN_DRAG_INTERVAL) {
                let offset = getNodePos(this.node);
                let pos = {
                    x: evt.pageX - offset.x,
                    y: evt.pageY - offset.y
                };
                let valX = ((pos.x / this.node.offsetWidth *
                    (this.props.maxX - this.props.minX)) +
                    this.props.minX) || 0,
                    valY = ((pos.y / this.node.offsetHeight *
                        (this.props.maxY - this.props.minY)) +
                        this.props.minY) || 0;
                    
                if (valX < this.props.minX) {
                    valX = this.props.minX;
                } else if (valX > this.props.maxX) {
                    valX = this.props.maxX;
                }
                
                if (valY < this.props.minY) {
                    valY = this.props.minY;
                } else if (valY > this.props.maxY) {
                    valY = this.props.maxY;
                }
                
                this.setState({
                    valueX: valX,
                    valueY: valY
                });
                
                this.props.onChange({
                    x: this.state.valueX,
                    y: this.state.valueY
                });
            }
            lastDragUpdate = Date.now();
        },
        setValue({x = this.state.valueX, y = this.state.valueY}) {
            this.props.valueX = x;
            this.props.valueY = y;
        }
    });
    
    module.exports = FancySlider;
    return FancySlider;
    
})();
