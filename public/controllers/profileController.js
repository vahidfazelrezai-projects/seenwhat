// controller for profile view
angular.module('seenwhatApp').controller("profileController", function ($scope, $rootScope, $routeParams, $location, DataService) {
    $scope.name = $routeParams.name;
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