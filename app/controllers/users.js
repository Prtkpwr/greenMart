var mongoose = require('mongoose');
var express = require('express');
 
var userModel = mongoose.model('User');
var productModel = mongoose.model('Product');
var cartModel = mongoose.model('Cart');
var userRouter  = express.Router();
var customRes = require("./../../lib/responseGenerator");

var auth = require("./../../middlewares/auth");


module.exports.controllerFunction = function(app) {


	// -------- API TO SIGNUP USER ---------

    userRouter.post('/signup',auth.isLoggedIn,function(req,res){

        var userInfo = {};

      if(req.body.firstname!=undefined && req.body.lastname!=undefined && req.body.password!=undefined && 
          req.body.email!=undefined){     

        userModel.findOne({"email":req.body.email},function(err,user){
           
            if(err){
                    var myResponse = customRes.generate(true,err,500,null);
                    res.send(myResponse);
            }
            else if(user && user!==null){
                
                userInfo.alreadyPresent = true;
                 var myResponse = customRes.generate(false,"Email already exist",200,userInfo);
                 res.send(myResponse);
            }

            else{
                 
                 var newUser = new userModel({

                    username    : req.body.firstname+' '+req.body.lastname,
                    firstName   : req.body.firstname,
                    lastName    : req.body.lastname,
                    email       : req.body.email 
                }); 

                newUser.password = crypto.encrypt(key,req.body.password);

                newUser.save(function(err,result){
                  
                  if(err){
                        var myResponse = customRes.generate(true,"Please check and enter details correctly",500,null);
                        res.send(myResponse);
                    }

                    else{

                    req.session.user = newUser;
                    req.session.loginStatus = true;

                    delete req.session.user.password ;
                        
                    var myResponse = customRes.generate(
                      false,"You have signed up successfully, You can login now using your email and password",200,req.session.user);
                     res.send(myResponse);

                    }

                });
            }
        })
      }

      else{
          var myResponse = customRes.generate(true,"You are missing something, check and enter details again",500,null);
          res.send(myResponse);
      }

    });
}