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
      },
      conditions: {
        initial: [
          {x: null, y: null},
          {x: null, y: null}
        ],
        boundary: [
          {x: null, t: null, y: null},
          {x: null, t: null, y: null}
        ]
      },
      mVariables: {
        m0: [
            {x: null, t: null},
            {x: null, t: null}
        ],
        m: [
            {x: null, t: null},
            {x: null, t: null}
        ]
      }
    };

    vm.selectStoredModel = selectStoredModel;
    vm.addInitialCondition = addInitialCondition;
    vm.addBoundaryCondition = addBoundaryCondition;
    vm.removeInitialCondition = removeInitialCondition;
    vm.removeBoundaryCondition = removeBoundaryCondition;
    vm.addM0Variable = addM0Variable;
    vm.addMVariable = addMVariable;
    vm.removeM0Variable = removeM0Variable;
    vm.removeMVariable = removeMVariable;
    vm.submitModelStepForm = submitModelStepForm;
    vm.submitAreaStepForm = submitAreaStepForm;
    vm.submitConditionsStepForm = submitConditionsStepForm;
    vm.submitMVariablesStepForm = submitMVariablesStepForm;
    vm.isAreaStepDisabled = isAreaStepDisabled;
    vm.isConditionsStepDisabled = isConditionsStepDisabled;
    vm.isMVariablesStepDisabled = isMVariablesStepDisabled;
    vm.isSolutionStepDisabled = isSolutionStepDisabled;

    function selectStoredModel () {
      vm.problem.model.g = STORED_MODEL_G;
      vm.problem.model.u = STORED_MODEL_U;
      vm.problem.model.y = STORED_MODEL_Y;
    }

    function addInitialCondition () {
      vm.problem.conditions.initial.push({
        x: null,
        y: null
      });
    }

    function addBoundaryCondition () {
      vm.problem.conditions.boundary.push({
        x: null,
        t: null,
        y: null
      });
    }

    function removeInitialCondition (initialCondition) {
      _removeElementFromArray(vm.problem.conditions.initial, initialCondition);
    }

    function removeBoundaryCondition (boundaryCondition) {
      _removeElementFromArray(vm.problem.conditions.boundary, boundaryCondition);
    }

    function addM0Variable () {
      vm.problem.mVariables.m0.push({
        x: null,
        t: null
      });
    }

    function addMVariable () {
      vm.problem.mVariables.m.push({
        x: null,
        t: null
      });
    }

    function removeM0Variable (m0Variable) {
      _removeElementFromArray(vm.problem.mVariables.m0, m0Variable);
    }

    function removeMVariable (mVariable) {
      _removeElementFromArray(vm.problem.mVariables.m, mVariable);
    }

    function submitModelStepForm () {
      if (!isAreaStepDisabled()) {
        vm.selectedStepIndex = 1;
      }
    }

    function submitAreaStepForm () {
      if (!isConditionsStepDisabled()) {
        vm.selectedStepIndex = 2;
      }
    }

    function submitConditionsStepForm () {
      if (!isMVariablesStepDisabled()) {
        vm.selectedStepIndex = 3;
      }
    }

    function submitMVariablesStepForm () {
      if (!isSolutionStepDisabled()) {
        vm.selectedStepIndex = 4;
      }
    }

    function isAreaStepDisabled () {
      return vm.modelStepForm && vm.modelStepForm.$invalid;
    }

    function isConditionsStepDisabled () {
      return isAreaStepDisabled() || (vm.areaStepForm && vm.areaStepForm.$invalid);
    }

    function isMVariablesStepDisabled () {
      return isConditionsStepDisabled() || (vm.conditionsStepForm && vm.conditionsStepForm.$invalid);
    }

    function isSolutionStepDisabled () {
      return isMVariablesStepDisabled() || (vm.mVariablesStepForm && vm.mVariablesStepForm.$invalid);
    }

    function _removeElementFromArray (array, element) {
      var index = array.indexOf(element);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }
})();
