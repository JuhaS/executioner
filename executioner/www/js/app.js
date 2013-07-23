var INVENTORY_URL = "/api/inventory"
var MODULES_URL = "/api/modules"

var inventoryController = angular.module("ansible-executor", []);

inventoryController.controller("InventoryCtrl", function InventoryCtrl($scope,  $http){
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
});

inventoryController.controller("ModuleCtrl", function InventoryCtrl($scope,  $http){
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
});