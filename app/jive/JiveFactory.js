(function() {
    'use strict';

    angular
        .module('app')
        .factory('JiveFactory', JiveFactory);

    JiveFactory.$inject = ['$http', '$q', '$log'];


    function JiveFactory($http, $q, $log) {
        var service = {
            getJive: getJive
        };
        return service;

        var WaltSentence = WaltSentence;
        function getJive(WaltSentence) {
            console.log(WaltSentence); 

            var apiUrl = 'https://jive.p.mashape.com/jive?text=';
            var defer = $q.defer();
            var url = apiUrl + WaltSentence;

            // console.log(url);
            $http({
                    method: 'GET',
                    url: url,
                    headers: { 'x-Mashape-Key': 'YiFrsq3fG9mshw1q4zwVYQiD98JZp1DySjljsnXnuCWCioQa5l' },
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                            toastr.success('Jive is Working!');
                        } else {
                            defer.reject(response);
                            toastr.warning('no Jive found<br/>' + response.config.url);
                        }
                    },
                    // failure
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                        toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
                    });

            return defer.promise;



        };

    }

})();
