(function() {
  'use strict';

  angular
    .module('dss')
    .controller('DssController', DssController);

  DssController.$inject = [];

  function DssController () {
    var vm = this;

    var STORED_MODEL_G = '(1/6.28)*(log(1/(x^2+t^2)^0.5))/log(2.718)';
    var STORED_MODEL_U = '-0.2*sin(x/5)-0.25*cos(t/4)';
    var STORED_MODEL_Y = '5*sin(x/5)+4*cos(t/4)';

    vm.selectedStepIndex = 0;
    vm.problem = {
      model: {
        g: '',
        u: '',
        y: ''
      },
      area: {
        t: null,
        x1: null,
        x2: null
      }
    };

    vm.selectStoredModel = selectStoredModel;
    vm.submitModelStepForm = submitModelStepForm;
    vm.submitAreaStepForm = submitAreaStepForm;
    vm.isAreaStepDisabled = isAreaStepDisabled;
    vm.isBoundaryConditionsStepDisabled = isBoundaryConditionsStepDisabled;
    vm.isMVariablesStepDisabled = isMVariablesStepDisabled;
    vm.isSolutionStepDisabled = isSolutionStepDisabled;

    function selectStoredModel () {
      vm.problem.model.g = STORED_MODEL_G;
      vm.problem.model.u = STORED_MODEL_U;
      vm.problem.model.y = STORED_MODEL_Y;
    }

    function submitModelStepForm () {
      vm.selectedStepIndex = 1;
    }

    function submitAreaStepForm () {
      vm.selectedStepIndex = 2;
    }

    function isAreaStepDisabled () {
      return vm.modelStepForm && vm.modelStepForm.$invalid;
    }

    function isBoundaryConditionsStepDisabled () {
      return isAreaStepDisabled() || (vm.areaStepForm && vm.areaStepForm.$invalid);
    }

    function isMVariablesStepDisabled () {
      return true;
    }

    function isSolutionStepDisabled () {
      return true;
    }
  }
})();
