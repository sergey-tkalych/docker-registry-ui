"use strict";

angular
	.module('RegistryApp.Breadcrumb')
	.controller('BreadcrumbCtrl', [
		'$scope',
		'$state',
		'BreadcrumbService',
		function($scope, $state, BreadcrumbService){
			var that = this;

			this.list = BreadcrumbService.list;

			$scope.$watch(function(){
				return BreadcrumbService.list;
			}, function(list){
				that.list = list;
			});

			this.goTo = function(breadcrumbItem){
				if(breadcrumbItem.route){
					$state.go(breadcrumbItem.route);
				}
			};
		}
	]);