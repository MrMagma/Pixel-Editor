"use strict";

var ColorPicker = (function () {

    var React = require("react");
    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var FancySlider = require("./FancySlider.jsx");
    var constants = require("../Constants.js");

    // var hues = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240,
    //     260, 280, 300, 320, 340, 360];
    // var hueGradient = `linear-gradient(to left, ${
    //     hues.map(hue => `hsla(${hue}, 100%, 50%, 1.0)`).join(",")
    // })`;

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
                { style: {
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 250,
                        height: 200
                    } },
                React.createElement("div", { style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "50%",
                        width: "100%",
                        background: "hsla(" + this.state.hue + ", 100%, 50%, 1.0)"
                    } }),
                React.createElement(FancySlider, { minX: 0, maxX: 100, minY: 0, maxY: 100,
                    valueX: this.state.saturation,
                    valueY: 100 - this.state.lightness / (1 - this.state.saturation / 200),
                    onChange: this.handleSLChange,
                    knobStyle: {
                        position: "absolute",
                        top: -7,
                        left: -7,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "3px solid #f8f8f8",
                        zIndex: "10",
                        backgroundColor: "hsla(" + this.state.hue + "," + (this.state.saturation + "%,") + (this.state.lightness + "%, 1.0)")
                    }, trackStyle: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "50%",
                        width: "100%",
                        backgroundSize: "100% 100%",
                        backgroundImage: "url(Resources/ColorPickerOverlay.png)"
                    } }),
                React.createElement(FancySlider, { minX: 0, maxX: 360,
                    valueX: 360 - this.state.hue,
                    onChange: this.handleHueChange,
                    knobStyle: {
                        position: "absolute",
                        top: -10,
                        left: -10,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "5px solid #f8f8f8",
                        backgroundColor: "hsla(" + this.state.hue + ", 100%, 50%, 1.0)"
                    }, trackStyle: {
                        position: "absolute",
                        top: "55%",
                        left: "5%",
                        width: "90%",
                        height: "0.75em",
                        borderRadius: "0.375em",
                        backgroundSize: "100% 100%",
                        backgroundImage: "url(Resources/ColorPickerTrack.png)"
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
        }
    });

    module.exports = ColorPicker;
    return ColorPicker;
})();