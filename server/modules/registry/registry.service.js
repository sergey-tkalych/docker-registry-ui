var request = require('request'),
	mongoose = require('mongoose'),
	Q = require('q'),
	objectAssign = require('object-assign'),
	RepositoryModel = mongoose.model('Repository');

function RegistryService(options){
	this.options = objectAssign({}, options);
}

RegistryService.prototype.getRepositories = function(){
	var that = this,
		repositoriesNames;

	return this
		._getRepositories()
		.then(function(names){
			repositoriesNames = names;
			return RepositoryModel.findRepositoriesByNames(that.options.url, names);
		})
		.then(function(repositoriesModels){
			var repositores = repositoriesNames.map(function(repository){
				return that._formatRepository(repository, repositoriesModels);
			});
			return Q(repositores);
		});
};

RegistryService.prototype._getRepositories = function(){
	var deferred = Q.defer(),
		url = this.options.url + '/v2/_catalog';

	request
		.get({url: url, json: true}, function(err, res, body){
			if(err){
				deferred.reject(err);
			}else{
				if(res.statusCode === 200){
					deferred.resolve(body.repositories);
				}else{
					deferred.reject(new Error('Registry: ' + res.statusMessage));
				}
			}
		})
		.auth(this.options.basic_auth_username, this.options.basic_auth_password, true);

	return deferred.promise;
};

RegistryService.prototype._formatRepository = function(name, repositoriesModels){
	for(var i = 0; i < repositoriesModels.length; i++){
		if(repositoriesModels[i].name === name){
			return repositoriesModels[i];
		}
	}

	return {
		registry_url: this.options.url,
		name: name
	}
};

RegistryService.prototype.getRepository = function(name){
	var that = this;

	return RepositoryModel
		.findRepositoriesByNames(that.options.url, [name])
		.then(function(repositoriesModels){
			var repository = that._formatRepository(name, repositoriesModels);
			return Q(repository);
		});
};

RegistryService.prototype.saveRepository = function(repository){
	return RepositoryModel
		.updateOneRepository(this.options.url, repository.name, repository)
		.then(function(repositoryModel){
			return Q(repositoryModel);
		});
};

RegistryService.prototype.getRepositoryTags = function(name){
	var deferred = Q.defer(),
		url = this.options.url + '/v2/' + name + '/tags/list';

	request
		.get({url: url, json: true}, function(err, res, body){
			if(err){
				deferred.reject(err);
			}else{
				deferred.resolve(body.tags.sort(function(a, b){
					if(a > b) return -1;
					else if(a < b) return 1;
					else return 0;
				}));
			}
		})
		.auth(this.options.basic_auth_username, this.options.basic_auth_password, true);

	return deferred.promise;
};

RegistryService.prototype.getRepositoryDetails = function(){

};

RegistryService.prototype.deleteImage = function(){

};

module.exports = RegistryService;