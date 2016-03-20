var Utils = require('../utils'),
	objectAssign = require('object-assign'),
	Q = require('q'),
	path = require('path');

function Config(){
	this.configPath = path.join(__dirname, 'config.json');
	this.rootPath = path.dirname(require.main.filename);
	this.data = {};
}

Config.prototype.setData = function(data){
	this.data = objectAssign(this.data, data);
};

Config.prototype.getData = function(key){
	if(key){
		return this.data[key];
	}
	return this.data;
};

Config.prototype.getEnvData = function(){
	return this.getData('environment');
};

Config.prototype.getDbData = function(){
	return this.getEnvData().db;
};

Config.prototype.init = function(debug){
	var that = this,
		deferred = Q.defer();

	Utils.fs
		.readJSON(this.configPath)
		.then(function(data){
			that.setData(data);
			return that.initAdditionalParams();
		})
		.then(function(){
			if(debug){
				console.log('Loaded config:');
				console.log(that.data);
			}
			deferred.resolve(that.data);
		})
		.catch(deferred.reject);

	return deferred.promise;
};

Config.prototype.initAdditionalParams = function(){
	var deferred = Q.defer();

	objectAssign(this.data.environment.db, getDb());
	objectAssign(this.data.environment, getApp());
	objectAssign(this.data.registry, getRegistry());

	deferred.resolve();

	return deferred.promise;
};

function getDb(){
	var data = {};

	if(process.env.MONGO_PORT){
		data.host = process.env.MONGO_PORT.replace('tcp://', '');
	}else{
		if(process.env.MONGODB_PORT_27017_TCP_ADDR && process.env.MONGODB_PORT_27017_TCP_PORT){
			data.host = process.env.MONGODB_PORT_27017_TCP_ADDR + ':' + process.env.MONGODB_PORT_27017_TCP_PORT;
		}
	}

	if(process.env.DATABASE){
		data.database = process.env.DATABASE;
	}

	if(process.env.MONGO_DEBUG){
		data.debug = process.env.MONGO_DEBUG;
	}

	return data;
}

function getApp(){
	var data = {};

	if(process.env.PORT){
		data.port = process.env.PORT;
	}

	return data;
}

function getRegistry(){
	var data = {};

	if(process.env.REGISTRY_URL){
		data.url = process.env.REGISTRY_URL;
	}

	if(process.env.REGISTRY_BASIC_AUTH_USERNAME){
		data.basic_auth_username = process.env.REGISTRY_BASIC_AUTH_USERNAME;
	}

	if(process.env.REGISTRY_BASIC_AUTH_PASSWORD){
		data.basic_auth_password = process.env.REGISTRY_BASIC_AUTH_PASSWORD;
	}

	return data;
}

module.exports = new Config();