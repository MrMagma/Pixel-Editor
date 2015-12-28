"use strict";

var constants = (function () {

    var constants = {
        SET_PIXEL: "setPixel",
        SET_DIMENSIONS: "setDim"
    };

    // We don't want anyone accidentally messing with our constants
    Object.freeze(constants);

    module.exports = constants;
    return constants;
})();