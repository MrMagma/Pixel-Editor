"use strict";

var CheckerBoard = (function () {

    var React = require("react");

    var CheckerBoard = React.createClass({
        displayName: "CheckerBoard",
        getDefaultProps: function getDefaultProps() {
            return {
                rows: 4,
                columns: 4,
                color1: "#444",
                color2: "#CCC",
                class: ""
            };
        },
        componentDidMount: function componentDidMount() {
            this.paint(this.refs.node.getContext("2d"));
        },
        render: function render() {
            return React.createElement("canvas", { ref: "node", className: this.props.class,
                style: this.props.style });
        },
        paint: function paint(ctx) {
            var w = this.refs.node.offsetWidth,
                h = this.refs.node.offsetHeight;
            var canvasW = this.refs.node.width;
            var canvasH = this.refs.node.height;
            var squareSz = undefined;

            if (w > h) {
                squareSz = h / this.props.rows;
            } else {
                squareSz = w / this.props.columns;
            }

            if (!squareSz) {
                return;
            }

            for (var x = 0; x < this.props.columns; x++) {
                for (var y = 0; y < this.props.rows; y++) {
                    if ((x + y) % 2 === 0) {
                        ctx.fillStyle = this.props.color1;
                    } else {
                        ctx.fillStyle = this.props.color2;
                    }
                    ctx.fillRect(squareSz * x / w * canvasW, squareSz * y / h * canvasH, squareSz / w * canvasW, squareSz / h * canvasH);
                }
            }
        }
    });

    module.exports = CheckerBoard;
    return CheckerBoard;
})();