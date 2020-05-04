window.populator = (function() {
    let populator = {
        generateId: function(prefix) {
            return prefix + Math.round(Math.random()*1e8).toString(16);
        }
    };

    return populator;
}());
