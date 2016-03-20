var fs = require('fs-extra'),
	Q = require('q'),
	path = require('path'),
	objectAssign = require('object-assign');

function callback(cb, err, data){
	if(cb){
		cb(err, data);
	}
}

function callbackResult(cb, err, deferred, data){
	if(err){
		callback(cb, err);
		deferred.reject(err);
	}else{
		callback(cb, null, data);
		deferred.resolve(data);
	}
}

exports.mv = function(pathSrc, pathDest, cb){
	var deferred = Q.defer();
	pathSrc = path.normalize(pathSrc);
	pathDest = path.normalize(pathDest);
	fs.move(pathSrc, pathDest, function (err){
		callbackResult(cb, err, deferred);
	});
	return deferred.promise;
};

exports.rm = function(pathSrc, cb){
	var deferred = Q.defer();
	pathSrc = path.normalize(pathSrc);
	fs.remove(pathSrc, function (err){
		callbackResult(cb, err, deferred);
	});
	return deferred.promise;
};

exports.cp = function(pathSrc, pathDest, cb){
	var deferred = Q.defer();
	pathSrc = path.normalize(pathSrc);
	pathDest = path.normalize(pathDest);
	fs.copy(pathSrc, pathDest, function (err){
		callbackResult(cb, err, deferred);
	});
	return deferred.promise;
};

exports.mkdir = function(pathSrc, cb){
	var deferred = Q.defer();
	pathSrc = path.normalize(pathSrc);
	fs.mkdirs(pathSrc, function (err){
		callbackResult(cb, err, deferred);
	});
	return deferred.promise;
};

exports.readJSON = function(pathSrc, options, cb){
	var deferred = Q.defer(),
		defaultOptions = {
			isNew: true
		};
	pathSrc = path.normalize(pathSrc);
	options = objectAssign(defaultOptions, options);
	fs.readJson(pathSrc, function(err, data){
		if(err){
			if(options.isNew){
				data = {};
				callback(cb, null, data);
				deferred.resolve(data);
			}else{
				callback(cb, err);
				deferred.reject(err);
			}
		}else{
			callback(cb, null, data);
			deferred.resolve(data);
		}
	});
	return deferred.promise;
};

exports.writeJSON = function(pathSrc, data, cb){
	var deferred = Q.defer();
	pathSrc = path.normalize(pathSrc);
	fs.outputJson(pathSrc, data, function(err){
		callbackResult(cb, err, deferred, data);
	});
	return deferred.promise;
};