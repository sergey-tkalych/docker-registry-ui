exports.getRepository = function(req, res, next){
	req.registry
		.getRepository(req.params.name)
		.then(function(repository){
			res.json(repository);
		})
		.catch(next);
};

exports.saveRepository = function(req, res, next){
	req.registry
		.saveRepository(req.body.repository)
		.then(function(){
			res.json({message: 'saved'});
		})
		.catch(next);
};

exports.getRepositoryTags = function(req, res, next){
	req.registry
		.getRepositoryTags(req.params.name)
		.then(function(tags){
			res.json(tags);
		})
		.catch(next);
};

exports.deleteRepositoryTag = function(req, res, next){
	req.registry
		.deleteRepositoryTag(req.params.name, req.params.tag)
		.then(function(){
			res.json({message: 'deleted'});
		})
		.catch(next);
};

exports.getRepositoryDetails = function(req, res, next){
	res.send('getRepositoryDetails');
};

exports.deleteRepository = function(req, res, next){
	res.send('deleteRepository');
};