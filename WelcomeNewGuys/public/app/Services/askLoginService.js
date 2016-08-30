'use strict';
app.factory('askLoginService', [ '$state', '$rootScope', function($state, $rootScope) {
        
        var askLoginServiceFactory = {};
        var onGotInfoFn;
        
        

        askLoginServiceFactory.setOnGotInfoCallback = function(fn) {
            onGotInfoFn = fn;
        }

        askLoginServiceFactory.transmitLoginInfo = function(user, pwd) {
            onGotInfoFn(user, pwd);
        }

    return askLoginServiceFactory;
}]);