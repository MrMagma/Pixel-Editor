"use strict";

var ColorPicker = (function () {

    var React = require("react");
    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var FancySlider = require("./FancySlider.jsx");
    var CheckerBoard = require("./CheckerBoard.jsx");
    var constants = require("../Constants.js");

    function makeKnobStyle(bgColor, offsetX, offsetY) {
        return {
            position: "absolute",
            top: offsetX,
            left: offsetY,
            width: "1em",
            height: "1em",
            backgroundColor: bgColor
        };
    }

    ColorPicker = React.createClass({
        displayName: "ColorPicker",
        getDefaultProps: function getDefaultProps() {
            return {
                onChange: function onChange() {}
            };
        },
        getInitialState: function getInitialState() {
            return {
                hue: this.props.hue !== undefined ? this.props.hue : 270,
                saturation: this.props.saturation !== undefined ? this.props.saturation : 100,
                lightness: this.props.lightness !== undefined ? this.props.lightness : 50,
                alpha: this.props.alpha !== undefined ? this.props.alpha : 1.0
            };
        },
        render: function render() {
            return React.createElement(
                "div",
                { className: this.props.class, style: this.props.style },
                React.createElement("div", { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "50%",
                        width: "100%",
                        background: "hsla(" + [this.state.hue, "100%", "50%", 1].join(",") + ")"
                    } }),
                React.createElement(FancySlider, { knobClass: "pixel-ui-slider-knob pixel-ui-shadowed",
                    minX: 0, maxX: 100, minY: 0, maxY: 100,
                    valueX: this.state.saturation,
                    valueY: 100 - this.state.lightness / (1 - this.state.saturation / 200),
                    onChange: this.handleSLChange,
                    knobStyle: makeKnobStyle("hsla(" + [this.state.hue, this.state.saturation + "%", this.state.lightness + "%", 1].join(",") + ")", "-0.75em", "-0.75em"),
                    trackStyle: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "50%",
                        width: "100%",
                        backgroundSize: "100% 100%",
                        backgroundImage: "url(Resources/ColorPickerOverlay.png)"
                    } }),
                React.createElement(FancySlider, { knobClass: "pixel-ui-slider-knob pixel-ui-shadowed",
                    trackClass: "pixel-ui-slider-track",
                    minX: 0, maxX: 360, valueX: 360 - this.state.hue,
                    onChange: this.handleHueChange,
                    trackStyle: {
                        position: "absolute",
                        top: "60%",
                        left: "30%",
                        width: "60%",
                        height: "1em",
                        backgroundSize: "100% 100%",
                        backgroundImage: "url(Resources/ColorPickerTrack.png)"
                    },
                    knobStyle: makeKnobStyle("hsla(" + [this.state.hue, "100%", "50%", "1.0"].join(",") + ")", "-0.25em", "-0.75em") }),
                React.createElement(CheckerBoard, { rows: 2, columns: 50,
                    "class": "pixel-ui-slider-track", style: {
                        position: "absolute",
                        top: "75%",
                        left: "30%",
                        width: "60%",
                        height: "1em"
                    } }),
                React.createElement(FancySlider, { knobClass: "pixel-ui-slider-knob pixel-ui-shadowed",
                    trackClass: "pixel-ui-slider-track " + "pixel-ui-vertical-alpha-overlay",
                    minX: 0, maxX: 1.0, valueX: this.state.alpha,
                    onChange: this.handleAlphaChange,
                    trackStyle: {
                        position: "absolute",
                        top: "75%",
                        left: "30%",
                        width: "60%",
                        height: "1em",
                        backgroundSize: "100% 100%",
                        backgroundImage: "linear-gradient(to left, hsla(" + [this.state.hue, this.state.saturation + "%", this.state.lightness + "%", 1].join(",") + "),hsla(" + [this.state.hue, this.state.saturation + "%", this.state.lightness + "%", 0].join(",") + "))"
                    },
                    knobStyle: makeKnobStyle("hsla(" + [this.state.hue, this.state.saturation + "%", this.state.lightness + "%", this.state.alpha].join(",") + ")", "-0.25em", "-0.75em") }),
                React.createElement(CheckerBoard, { "class": "pixel-ui-slider-knob",
                    style: {
                        position: "absolute",
                        left: "10%",
                        top: "60%",
                        width: "10%",
                        height: "10%"
                    } }),
                React.createElement("div", { className: "pixel-ui-slider-knob", style: {
                        position: "absolute",
                        left: "10%",
                        top: "60%",
                        width: "10%",
                        height: "10%",
                        backgroundColor: "hsla(" + this.state.hue + "," + (this.state.saturation + "%,") + (this.state.lightness + "%,") + (this.state.alpha + ")")
                    } })
            );
        },
        handleHueChange: function handleHueChange(val) {
            this.setState({
                hue: 360 - val.x
            });
            this.props.onChange({
                hue: this.state.hue,
                saturation: this.state.saturation,
                lightness: this.state.lightness,
                alpha: this.state.alpha
            });
        },
        handleSLChange: function handleSLChange(val) {
            var saturation = val.x;
            var lightness = (100 - val.y) * (1 - val.x / 200);
            if (lightness === 0) {
                saturation = 0;
            }
            this.setState({
                saturation: saturation,
                lightness: lightness
            });
            this.props.onChange({
                hue: this.state.hue,
                saturation: this.state.saturation,
                lightness: this.state.lightness,
                alpha: this.state.alpha
            });
        },
        handleAlphaChange: function handleAlphaChange(val) {
            this.setState({
                alpha: val.x
            });
            this.props.onChange({
                hue: this.state.hue,
                saturation: this.state.saturation,
                lightness: this.state.lightness,
                alpha: this.state.alpha
            });
        }
    });

    module.exports = ColorPicker;
    return ColorPicker;
})();