var Dispatcher = (function() {
    var Dispatcher = require("flux").Dispatcher;
    
    var dispatcher = new Dispatcher();
    
    module.exports = dispatcher;
    return dispatcher;
    
})();
