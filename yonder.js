/*jshint browser:true*/
/*global chrome:false, console:false*/
(function(){
    var require = (function() {
        var cache = {};
        var _export = function(obj, localPath) {
            cache[localPath] = obj;
        };
        window._export = _export;

        return function(localPath, callback) {
            var exported = cache[localPath];
            if ( exported ) {
                callback(exported);
            }
            else {
                var fullPath = chrome.extension.getURL(localPath);
                var script = document.createElement('script');
                script.src = fullPath;
                script.onload = function() {
                    callback(cache[localPath]);
                };
                document.body.appendChild(script);
            }
        };
    })();

    chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab){
        if ( tab.status === 'complete' ) {
            require('router.js', function(Router){
                chrome.tabs.executeScript(
                    null,
                    {
                        file : 'hoge.js'
                    }
                );
            });
        }
    });
})();
