(function() {
    'use strict';

    angular
        .module('app')
        .controller('SpeechController', SpeechController);

    SpeechController.$inject = ['SpeechFactory', 'JiveFactory'];

    /* @ngInject */
    function SpeechController(SpeechFactory) {
        var vm = this;
        vm.title = 'SpeechController';


        vm.getSpeech = function getSpeech(JiveResponse) {
            SpeechFactory.getSpeech(JiveResponse)
                .then(function(response) {
                        console.log(response)
                            // vm.JiveResponse = response.data.contents;
                    },
                    function(error) {
                        $log.error('failed to get speech', error)

                    });


        };

        // app.controller('SpeachController', SpeachController);

        // activate();

        // function activate() {
        //     vm.getSpeech('Go to work')
        // };



        // vm.model = SharedService;
    }

})();
