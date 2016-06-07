var RegistriesService = require('../services/registries.service');

exports.getRegistries = function(req, res, next){
	RegistriesService
		.getRegistries()
		.then(function(registries){
			res.json(registries);
		})
		.catch(next);
};