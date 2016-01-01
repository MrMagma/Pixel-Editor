var CheckerBoard = (function() {
    
    var React = require("react");
    
    var CheckerBoard = React.createClass({
        getDefaultProps() {
            return {
                rows: 4,
                columns: 4,
                color1: "#444",
                color2: "#CCC",
                class: ""
            }
        },
        componentDidMount() {
            this.paint(this.refs.node.getContext("2d"));
        },
        render() {
            return <canvas ref="node" className={this.props.class}
                style={this.props.style}/>;
        },
        paint(ctx) {
            let w = this.refs.node.offsetWidth,
                h = this.refs.node.offsetHeight;
            let canvasW = this.refs.node.width;
            let canvasH = this.refs.node.height;
            let squareSz;
            
            if (w > h) {
                squareSz = h / this.props.rows;
            } else {
                squareSz = w / this.props.columns;
            }
            
            if (!squareSz) {
                return;
            }
            
            for (let x = 0; x < this.props.columns; x++) {
                for (let y = 0; y < this.props.rows; y++) {
                    if ((x + y) % 2 === 0) {
                        ctx.fillStyle = this.props.color1;
                    } else {
                        ctx.fillStyle = this.props.color2;
                    }
                    ctx.fillRect(squareSz * x / w * canvasW,
                        squareSz * y / h * canvasH,
                        squareSz / w * canvasW, squareSz / h * canvasH);
                }
            }
        }
    });
    
    module.exports = CheckerBoard;
    return CheckerBoard;
        
})();
