(function() {
  'use strict';

  angular
    .module('dss')
    .controller('DssController', DssController);

  DssController.$inject = [];

  function DssController () {
    var vm = this;

    vm.problem = {
      dimension: 1
    };

    vm.processes = [
      {},
      {}
    ];

    vm.submitProblem = submitProblem;

    function submitProblem () {
      alert('42');
    }
  }
})();
