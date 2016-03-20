"use strict";

angular
	.module('RegistryApp')
	.controller('RepositoriesCtrl', [
		'RegistryService',
		'BreadcrumbService',
		function(RegistryService, BreadcrumbService){
			var that = this;

			BreadcrumbService.setBreadcrumb([
				{
					text: 'Repositories'
				}
			]);
			this.list = false;

			RegistryService
				.getRepositories()
				.success(function(list){
					that.list = list;
				})
				.error(function(){

				});
		}
	]);