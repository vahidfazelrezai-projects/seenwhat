// controller for splash view
angular.module('seenwhatApp').controller("splashController", function ($scope, $rootScope, $location, DataService) {
	$scope.name = "Vahid Fazel-Rezai";
    $scope.items = [];

    DataService.getData('/api/getUser', {'name': $scope.name})
    .then(function(data) {
        if (typeof data === 'object') {
            console.log("Got " + typeof data);
            $scope.items = data.items;
        } else {
            console.log("Could not get user");
        }
    })
});