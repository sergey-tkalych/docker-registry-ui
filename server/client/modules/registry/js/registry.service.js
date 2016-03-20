"use strict";

angular
	.module('RegistryApp')
	.service('RegistryService', [
		'$http',
		function($http){
			this.getRepositories = function(){
				return $http.get('/api/v1/repositories');
			};

			this.getRepository = function(name){
				return $http.get('/api/v1/repository/' + name);
			};

			this.getRepositoryTags = function(name){
				return $http.get('/api/v1/repository/' + name + '/tags');
			};

			this.saveRepository = function(repository){
				return $http.put('/api/v1/repository/' + repository.name, {repository: repository});
			};
		}
	]);