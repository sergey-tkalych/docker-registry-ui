module.exports = function(app){
	require('./repository.model');

	app.use(require('./routes'));
};