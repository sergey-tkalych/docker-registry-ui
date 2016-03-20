"use strict";

angular
	.module('RegistryApp', [
		'ngMaterial',
		'ngMdIcons',
		'ui.router',
		'yaru22.md',
		'RegistryApp.Breadcrumb'
	])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'modules/registry/views/repositories.html'
				})
				.state('repository', {
					url: '/:name',
					templateUrl: 'modules/registry/views/repository.html'
				});
		}
	]);