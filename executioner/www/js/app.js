var INVENTORY_URL = "/api/inventory";
var MODULES_URL = "/api/modules";
var RUNCOMMAND_URL = "/api/runcommand";



var app = angular.module("ansible-executor", [], function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!');
	
	$routeProvider.when('/', {
			templateUrl: '/runcmd.html',
			controller: RunViewCtrl
	});
	$routeProvider.when('/results', {
			templateUrl: '/results.html',
			controller: ResultsCtrl 
	});
	$routeProvider.otherwise({redirectTo: '/'});

});

app.filter('pretty_json', function() {
    return function(input) {
    	if (input) {
    		return JSON.stringify(input, undefined, 2).replace(/\\n/g, "\n") ;
    	} 
    	return ""
    	 
    }
});

function ResultsCtrl($scope, $http){
	$scope.page.header = "Results: "
};

app.controller("InventoryCtrl", function InventoryCtrl($scope,  $http){
	$scope.hosts = [];
	$scope.groups = [];
	$http.get(INVENTORY_URL).
	  success(function(inventory, status, headers, config) {
		  for (var i in inventory) {
			  if (inventory[i]["type"] == "host"){
				  $scope.hosts.push(inventory[i]["name"]);
				} else if (inventory[i]["type"] == "group"){
					$scope.groups.push(inventory[i]["name"]);
				} else {
					console.error("Unknown inventory type for object: " + inventory[i]);
				}
		  }
		  
	  }).
	  error(function(data, status, headers, config) {
		  console.error("Ajax error: " + data);
	  });
	
	$scope.setHost = function(host) {
		$scope.runnable.hosts = host;
	}
});

app.controller("ModuleCtrl", function ModuleCtrl($scope,  $http){
	$scope.modules = [];
	
	$http.get(MODULES_URL).
		success(function(modules, status, headers, config) {
			for (var i in modules) {
				$scope.modules.push(modules[i]["name"]);
			}
		}).
		error(function(data, status, headers, config) {
			console.error("Ajax error: " + data);
		});
	
	$scope.setModule = function(module) {
		$scope.runnable.module = module;
	}
});


app.controller("WrapperCtrl", function WrapperCtrl($scope,  $http){
	$scope.page = {};
	$scope.page.header = "Loading...";
});


function RunViewCtrl($scope, $http, $location){
	$scope.runnable = {};
	$scope.page.header = "Run module: "
	$scope.submitRunnable = function() {
		$http.get(RUNCOMMAND_URL + 
				"?host=" + ($scope.runnable.hosts || "") +
				"&module=" + ($scope.runnable.module || "") +
				"&attr=" + ($scope.runnable.attr || "")
			)
			.success(function(result, status, headers, config) {
				
				$scope.page.results = result;
			})
			.error(function(data, status, headers, config) {
				console.error("Ajax error: " + data);
			});
		$location.path('/results');
		return false;
	}
};

