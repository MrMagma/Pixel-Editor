var constants = (function() {

    let constants = {
        SET_PIXEL: "setPixel",
        SET_DIMENSIONS: "setDim",
        SET_BRUSH: "setBrushColor"
    };
    
    // We don't want anyone accidentally messing with our constants
    Object.freeze(constants);
    
    module.exports = constants;
    return constants;

})();
