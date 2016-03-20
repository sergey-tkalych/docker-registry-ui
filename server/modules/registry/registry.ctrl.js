var Config = require('../config'),
	RegistryService = require('./registry.service');

exports.getRegistry = function(req, res, next){
	var registryConfig = Config.getData('registry');

	req.registry = new RegistryService(registryConfig);
	next();
};