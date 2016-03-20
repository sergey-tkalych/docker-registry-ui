var mongoose = require('mongoose'),
	Q = require('q'),
	schemaRepository = new mongoose.Schema({
		registry_url: String,
		name: String,
		description: String,
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	});

schemaRepository.statics.findRepositoriesByNames = function(registryUrl, names){
	var deferred = Q.defer();

	this
		.find({
			registry_url: registryUrl,
			name: {$in: names}
		})
		.exec(function(err, repositories){
			if(err){
				deferred.reject(err);
			}else{
			}
			deferred.resolve(repositories);
		});

	return deferred.promise;
};

schemaRepository.statics.findOneRepositoryByName = function(registryUrl, name){
	return this
		.findRepositoriesByNames(registryUrl, [name])
		.then(function(repositories){
			if(repositories.length === 1){
				return Q(repositories[0]);
			}else{
				return Q();
			}
		});
};

schemaRepository.statics.updateOneRepository = function(registryUrl, name, data){
	var deferred = Q.defer();

	this
		.findOneAndUpdate({
			registry_url: registryUrl,
			name: name
		}, data, {upsert: true}, function(err, repository){
			if(err){
				deferred.reject(err);
			}else{
			}
			deferred.resolve(repository);
		});

	return deferred.promise;
};

mongoose.model('Repository', schemaRepository);