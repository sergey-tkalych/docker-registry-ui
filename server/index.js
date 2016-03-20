var Config = require('./modules/config');

Config
	.init(process.env.NODE_ENV === 'development')
	.then(initApp)
	.catch(function(err){
		console.error(err.stack);
		throw new Error(err);
	});

function initApp(){
	var express = require('express'),
		path = require('path'),
		bodyParser = require('body-parser'),
		app = express(),
		envData = Config.getEnvData();

	require('./db');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static(path.join(__dirname, 'client')));

	require('./modules/registry')(app);

	app.listen(envData.port, function(){
		console.log('Docker Registry UI started ad port: ' + envData.port);
	});
}