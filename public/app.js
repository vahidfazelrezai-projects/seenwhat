angular.module('seenwhatApp', ['ngRoute'])

//routing definitions
.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
	    $routeProvider
		.when('/', {
	        templateUrl: '/views/splash.html',
	        controller: 'splashController'
	    })
        .when('/profile/:name', {
            templateUrl: '/views/profile.html',
            controller: 'profileController'
        })
        .when('/feed', {
            templateUrl: '/views/feed.html',
            controller: 'feedController'
        })
	    .otherwise({
	        redirectTo: '/'
	    });
    //remove # from URL
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}])

.run(function($route, $rootScope, $location, $routeParams) {
    //watch for route changes and redirect accordingly
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    	//set current variable to template (used in showing/hiding elements)
    	$rootScope.current = next.templateUrl;
	});
})