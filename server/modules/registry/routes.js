var express = require('express'),
	router = express.Router(),
	RegistryCtrl = require('./registry.ctrl'),
	RepositoriesCtrl = require('./repositories.ctrl'),
	RepositoryCtrl = require('./repository.ctrl');

router.get('/api/v1/repositories', RegistryCtrl.getRegistry, RepositoriesCtrl.getRepositories);
router.get('/api/v1/repository/:name', RegistryCtrl.getRegistry, RepositoryCtrl.getRepository);
router.put('/api/v1/repository/:name', RegistryCtrl.getRegistry, RepositoryCtrl.saveRepository);
router.get('/api/v1/repository/:name/tags', RegistryCtrl.getRegistry, RepositoryCtrl.getRepositoryTags);

module.exports = router;