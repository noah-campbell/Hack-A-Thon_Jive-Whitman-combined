(function() {
    'use strict';

    angular
        .module('app')
        .factory('PoemService', PoemService);

    PoemService.$inject = ['$http', '$q', '$log', 'JiveFactory'];
   

    function PoemService($http, $q, $log, JiveFactory) {
        var service = {
            getPoem: getPoem

        };
        return service;

        function getPoem(poem) {
            var apiUrl = 'https://pafmon-walt-whitman-poems.p.mashape.com/poems/o-captain-my-captain';
            var defer = $q.defer();
            var url = apiUrl;

            $http({
                    method: 'GET',
                    url: url,
                    headers: { 'x-Mashape-Key': '7xPhWVPiwCmshsPA6kjiciWfcdEBp1UM6TVjsndBY3rAWdZ72S' },
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {                            
                            
                            JiveFactory.getJive(response.data.text)
                            .then (
                                function(response){
                                defer.resolve(response.data.contents.translated);
                                console.log(response.data.contents.translated);
                                responsiveVoice.speak(response.data.contents.translated, "UK English Male", {rate: 1.1})
                            });

                            toastr.success('Poem is Working!');

                        } else {
                            defer.reject(response);
                            toastr.warning('no Poem found<br/>' + response.config.url);
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
