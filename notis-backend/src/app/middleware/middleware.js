
let moment = require('moment');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;
let CommonController = require('../nse/controllers/nseCommon');
let ResponseController = require('../nse/controllers/nseResponse');
let Utils = require('../../config/Utils.js');
let Constants = require('../../config/Constants.js');
let that = null;

class NseMiddleware {
    constructor(){
        this.utils = new Utils();
        this.CommonController = new CommonController();
        this.ResponseController = new ResponseController();
        that = this;
    };
    
    async authReq(req, res, next) {
		let reqToken = req.body.token ? req.body.token : req.query.token;
	    if(!reqToken){
	        reqToken = req.params.token ? req.params.token : null
	    }
	    if(!reqToken && (req.headers['token'] || req.headers.token)){
	        token = req.headers['token'] ? req.headers['token'] : req.headers.token
	    }
	    if(!reqToken){
	    	 res.send(that.ResponseController.unauthorisesdErrorResponse());	// Request dosent has token
	    }
		let NseUsersModel = require('../nse/models/NseUsersModel');
	    let userinfo = await NseUsersModel.findAll({ 
	        where:{
	            'token': reqToken
	        }
	    })
	    //console.log("Middleware userinfo result ----> ",userinfo,userinfo.length)
	    if(!userinfo || !userinfo.length || userinfo.length < 1){
	    	 res.send({
	    		'code' : Constants.UNAUTHORISED_ERROR.CODE,
	    		'status': Constants.UNAUTHORISED_ERROR.STATUS,
	    		'error' : "Missing/Invalid Token."  
	    	})	// token dosent exist
	    }
	    userinfo = userinfo[0].dataValues;
	    console.log("User Info In Middleware ----> ", userinfo)
	    let prevTtl = (userinfo.token_ttl && new Date(userinfo.token_ttl) != 'Invalid Date') ? new Date(userinfo.token_ttl) : null;
	    console.log("Token Valid ? ",prevTtl > new Date(), prevTtl, new Date(), " | after adding 15min ---> ",moment(prevTtl).add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss'))
	    if(!prevTtl || prevTtl <= new Date()){
	    	console.log("!!!!!!! Token Expired !!!!!!")
	    	return res.send({code:401,error:"Token Expired", status:"Unauthorized"});	// token ttl dosent exist
	    	// res.send(that.ResponseController.unauthorisesdErrorResponse('Token Expired.'));	// token ttl dosent exist
	    }
	    let market = req.body.marketType || req.query.marketType;
	    //console.log('Market access condition: ',!userinfo.permitted_markets, userinfo.permitted_markets.split(',').length < 1,userinfo.permitted_markets.split(','),req.body.marketType, userinfo.permitted_markets.split(',').includes(req.body.marketType))
	    if(!userinfo.permitted_markets || userinfo.permitted_markets.split(',').length < 1 || !userinfo.permitted_markets.split(',').includes(market)){
	        console.log("You Dont have access rights. !!!!!!!!!!!!!!!!!!!!!!!!!!");
	        let resp = {
	    		'code' : Constants.FORBIDDEN_ERROR.CODE,
	    		'status': Constants.FORBIDDEN_ERROR.STATUS,
	    		'error' : "You Don't have rights to View this Market. Contact Admin Team for Viewing Rights."
    		}
	        return res.send(resp);
	    }
	    req['user'] = {
	    	'id': userinfo.id,
	    	'user_email':userinfo.email,
	    	'role': userinfo.role 
	    }
	    console.log("Updating token_ttl Middleware ---->")
	    await NseUsersModel.update({
	        token_ttl: moment(prevTtl).add(15, 'minutes').format('YYYY-MM-DD HH:mm:ss')
	    },{
	        returning: true,
	        where:{
	            'token': reqToken
	        }
	    });
	    return next();
	    // prevTtl = moment(prevTtl).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');

	}
}


module.exports = NseMiddleware;
