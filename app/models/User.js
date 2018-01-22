// creating a mongoose schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating new schema
var userSchema = new Schema({

	firstName  			: {type:String,default:'',required:true},
	lastName  			: {type:String,default:'',required:true},
	email	  			: {type:String,default:'',required:true},
	password			: {type:String,default:'',required:true},

	cart 				: {type: Schema.Types.ObjectId, ref: 'Cart'}

},{timestamps:true});


// exporting the model to app
module.exports = mongoose.model('User', userSchema);
