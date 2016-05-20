(function() {
    'use strict';

    angular
        .module('app')
        .factory('SpeechFactory', SpeechFactory);

    SpeechFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function SpeechFactory($http, $q, $log) {
        var service = {
            getSpeech: getSpeech
        };
        return service;

        function getSpeech(JiveResponse) {
            var apiUrl = "https://voicerss-text-to-speech.p.mashape.com/?key=f37677e689b749cb85c3407b3fe8227c&c=mp3&f=8khz_8bit_mono&hl=en-us&r=-3&src=";
            var defer = $q.defer();
            var url = apiUrl + JiveResponse;

            $http({
                    method: 'GET',
                    url: url,
                    headers: { 'x-Mashape-Key': '2Qa0ElEySAmsh8CcPQxSVSutxdhJp1eHck4jsnhhDwhUk2xnPI' },
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response);
                            toastr.success('Speech is Working!');
                        } else {
                            defer.reject(response);
                            toastr.warning('SpeechFactory not working<br/>' + response.config.url);
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
