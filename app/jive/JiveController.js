(function() {
    'use strict';

    angular.module('app')
        .controller('JiveController', JiveController);

    JiveController.$inject = ['JiveFactory'];


    function JiveController(JiveFactory) {
        var vm = this;
        vm.title = 'JiveController';
    

        vm.getJive = function getJive(WaltSentence) {
            JiveFactory.getJive(vm.WaltSentence).then(
                function(response) {
                    vm.WaltSentence = WaltSentence;
                    vm.JiveResponse = response.data.contents.translated;

                },

                function(error) {
                    $log.error('failed to get JiveResponse', error)
                });

            // used to invoke getSpeach
            // vm.getSpeach(vm.JiveResponse);

        };
        //  --------- Reactivate this Code once Speach is working ------------
        activate();

        function activate() {
            vm.getJive(vm.WaltSentence);
        };

        // vm.model = SharedService;
    };

})();
