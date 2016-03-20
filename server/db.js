var mongoose = require('mongoose'),
	connection,
	Config = require('./modules/config'),
	dbConfig = Config.getDbData(),
	schemaLogger = new mongoose.Schema({
		ip: String,
		user_agent: String,
		created_at: {type: Date, default: Date.now}
	});

mongoose.model('Logger', schemaLogger);

mongoose.connect('mongodb://' + dbConfig.host + '/' + dbConfig.database);

connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.once('open', function callback(){
	console.log('Connected to DB: ' + dbConfig.database);
});