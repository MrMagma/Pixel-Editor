var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
var EventEmitter = require('events').EventEmitter;

var pixels = [[0]];

var events = {
    resize({width = pixels.length, height = pixels[0].length}) {
        if (width > 0) {
            // Set the width of the pixels array
        }
        if (height > 0) {
            // Set the height of the pixels array
        }
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
