(function() {

    'use strict';
    angular
        .module('app')
        .controller('PoemController',  PoemController);

    PoemController.$inject = ['PoemService'];

    /* @ngInject */
    function PoemController(PoemService) {
        var vm = this;
        vm.title = 'PoemController';
        vm.poemArray = [''];
       
        vm.getPoem = function getPoem(poem) {
            PoemService.getPoem(poem).then(
                function(response) {
                    vm.Response = response;
                        console.log(response);
        		},
        		function(error) {
        			$log.error('failed to get Poem API', error)
        		});
        };
        activate();

        function activate() {
            vm.getPoem('');

        };        
    };   
})();










