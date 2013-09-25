/*jshint browser:true*/
/*global console:false */
(function(){
    try {
        if ( !window.localStorage ) return;
    }
    catch (e) {
        return;
    }

    var _querySelectorAll = function(node, selector, callback) {
        Array.prototype.forEach.call(node.querySelectorAll(selector), callback);
    };

    var storageKey = 'kokomade-yonder';
	var cachedTids = window.localStorage.getItem(storageKey);

    if ( cachedTids === null ) {
        cachedTids = [];
    }
    else {
        cachedTids = cachedTids.split(',');
    }

    var haveTidInStorage = function(tid) {
        return cachedTids.some(function(cachedTid){return ( cachedTid === tid );});
    };

    _querySelectorAll(document, '.tlistrow', function(node){
        var match = node.querySelector('.tlistname > a').href.match(/tid=(\d+)/);
        if ( !match ) throw 'dameda!';
        var tid = match[1];

        if ( haveTidInStorage(tid) ) {
            _querySelectorAll(node, 'td', function(node){ node.style.backgroundColor = 'black'; });
        }

        node.addEventListener('click', function(){
            if ( haveTidInStorage(tid) ) {
                cachedTids = cachedTids.filter(function(cachedTid){
                    return ( cachedTid !== tid );
                });
                _querySelectorAll(node, 'td', function(node){ node.style.backgroundColor = 'initial'; });
            }
            else {
                cachedTids.push(tid);
                _querySelectorAll(node, 'td', function(node){ node.style.backgroundColor = 'black'; });
            }
            window.localStorage.setItem(storageKey, cachedTids.join(','));
        });
    });
})();
