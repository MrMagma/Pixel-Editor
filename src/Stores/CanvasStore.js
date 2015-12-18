var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;
var PixelImage = require("../PixelImage/PixelImage.js");

var pixelImage = new PixelImage();

var events = {
    resize({width, height}) {
        if (width > 0) {
            // Set the width of the pixels array
        }
        if (height > 0) {
            // Set the height of the pixels array
        }
    },
    setpixel({x, y, color}) {
        
    }
};

var CanvasStore = {
    
};

_.extendOwn(CanvasStore, EventEmitter.prototype, {
    
});

CanvasDispatcher.register(function(action) {
    if (events[action.type]) {
        events[action.type](action);
    }
});
