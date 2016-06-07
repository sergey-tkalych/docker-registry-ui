var mongoose = require('mongoose'),
	Q = require('q'),
	schemaRegistry = new mongoose.Schema({
		name: String,
		url: String,
		api_version: String,
		data: Object,
		default: {type: Boolean, default: false},
		created_at: {type: Date, default: Date.now},
		updated_at: {type: Date, default: Date.now}
	});

schemaRegistry.set('toJSON', {
	virtuals: true,
	minimize: false,
	transform: function(doc, ret){
		ret.id = ret._id;

		delete ret.__v;
		delete ret._id;
		delete ret.data;
		delete ret.created_at;
		delete ret.updated_at;

		return ret;
	}
});

mongoose.model('Registry', schemaRegistry);
