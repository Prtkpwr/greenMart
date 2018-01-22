
// creating a mongoose schema

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//creating new schema
var cartSchema = new Schema({

	productName:{type:String,default:'',required:true},
	category  : {type:String,default:''},
	price     : {type:Number,default:0,required:true}

})


// exporting the model to app
module.exports = mongoose.model('Cart', cartSchema);
