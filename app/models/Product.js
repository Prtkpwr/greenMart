// designing a mongoose schema 


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating new schema
var productSchema = new Schema({

	productName  		: {type:String,default:'',required:true},
	category			: {type:String,default:'',required:true},
	price				: {type:Number,default:0,required:true},
	additionalInfo		: {type:String,default:'',required:true},
	availability	  	: {type:Boolean,default:true,required:true}

},{timestamps:true});



// exporting the model to app
module.exports = mongoose.model('Product', productSchema);