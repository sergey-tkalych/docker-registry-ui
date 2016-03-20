"use strict";

angular
	.module('RegistryApp')
	.controller('RepositoryCtrl', [
		'$stateParams',
		'$mdToast',
		'RegistryService',
		'BreadcrumbService',
		function($stateParams, $mdToast, RegistryService, BreadcrumbService){
			var that = this;

			BreadcrumbService.setBreadcrumb([
				{
					text: 'Repositories',
					route: 'home'
				},
				{
					text: $stateParams.name
				}
			]);
			this.tags = false;

			RegistryService
				.getRepository($stateParams.name)
				.success(function(repository){
					that.item = repository;
					that.registryHost = getPullHost(repository.registry_url);
				})
				.error(function(){

				});

			RegistryService
				.getRepositoryTags($stateParams.name)
				.success(function(list){
					that.tags = list;
				})
				.error(function(){

				});

			this.editMode = false;
			this.editIcon = 'mode_edit';

			this.toggleEditMode = function(){
				that.editMode = !that.editMode;
				that.editIcon = that.editMode ? 'check' : 'mode_edit';

				if(!that.editMode){
					RegistryService
						.saveRepository(that.item)
						.success(function(){
							$mdToast.show(
								$mdToast.simple()
									.textContent('Saved!')
									.position('bottom left')
									.hideDelay(3000)
							);
						})
						.error(function(){

						});
				}
			};

			this.selectTag = function(tag){
				that.selectedTag = ':' + tag;
			};

			function getPullHost(registryUrl){
				var parser = document.createElement('a');
				parser.href = registryUrl;
				return parser.host;
			}
		}
	]);