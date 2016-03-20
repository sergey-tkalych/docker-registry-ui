exports.getRepositories = function(req, res, next){
	req.registry
		.getRepositories()
		.then(function(repositories){
			res.json(repositories);
		})
		.catch(next);
};