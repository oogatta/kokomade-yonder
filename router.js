/*jshint browser:true*/
/*global console:false, _export:false */
(function(){
    var routing = {
        'nyaa' : '^http://www.nyaa.se/'
    };


    var _compile = function(routing) {
        Object.keys(routing).forEach(function(key){
            routing[key] = new RegExp(routing[key]);
        });
    };

    var _find = function(arr, callback) {
        var target = null;
        Object.keys(arr).forEach(function(element){
            if ( callback(element) ) {
                target = element;
                return;
            }
        });
        return target;
    };

    var router = {
        getPlugin : function(url) {
            return _find(routing, function(key){
                return ( routing[key].test(url) );
            });
        }
    };

    _compile(routing);
    _export(router, 'router.js');
})();
