/*jshint browser:true*/
/*global chrome:false, console:false*/
(function(){
    var require = (function() {
        var cache = {};
        var _export = function(obj, localPath) {
            cache[localPath] = obj;
        };
        window._export = _export;
        var _load = function(localPath, callback) {
            var fullPath = chrome.extension.getURL(localPath);
            var script = document.createElement('script');
            script.src = fullPath;
            script.onload = function() {
                callback(cache[localPath]);
            };
            document.body.appendChild(script);
        };

        return function(localPath, callback) {
            var exported = cache[localPath];
            if ( exported ) {
                callback(exported);
            }
            else {
                _load(
                    localPath,
                    function(exported) {
                        callback(exported);
                    }
                );
            }
        };
    })();

    chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab){
        if ( !/^http/.test(tab.url) ) return;

        if ( tab.status === 'complete' ) {
            require('router.js', function(router){
                var plugin = router.getPlugin(tab.url);
                if ( plugin ) {
                    chrome.tabs.executeScript(
                        null,
                        {
                            file : 'plugins/' + plugin + '.js'
                        }
                    );
                }
            });
        }
    });
})();
