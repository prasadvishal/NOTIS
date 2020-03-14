let Utils = require('../../../config/Utils.js');
let Constants = require('../../../config/Constants.js');

class NseResponse {
    constructor(){
        this.utils = new Utils();
    }

    async serverErrorResponse() {
    	let errResp = {
    		'code' : Constants.SERVER_ERROR.CODE,
    		'status': Constants.SERVER_ERROR.STATUS,
    		'error' : "Internal Server Error. Please try after sometime."
    	}
        return errResp;
    }

    async badRequestErrorResponse(MissingParams) {
    	console.log("inside badRequestErrorResponse ---> ",MissingParams,Constants.BAD_REQUEST_ERROR.CODE, Constants.BAD_REQUEST_ERROR.STATUS)
    	let errResp = {
    		'code' : Constants.BAD_REQUEST_ERROR.CODE,
    		'status': Constants.BAD_REQUEST_ERROR.STATUS,
    		'error' : "Bad Request." + MissingParams.length ? ` Invalid Params: ${MissingParams}` : ""
    	}
        return errResp;
    }
    async notFoundErrorResponse(resource = []) {
    	let errResp = {
    		'code' : Constants.NOT_FOUND_ERROR.CODE,
    		'status': Constants.NOT_FOUND_ERROR.STATUS,
    		'error' : "Resource Not Found."  + resource.length ? ` Invalid Params: ${resource.join()}` : ""
    	}
        return errResp;
    }
    async unauthorisesdErrorResponse(data='') {
    	let errResp = {
    		'code' : Constants.UNAUTHORISED_ERROR.CODE,
    		'status': Constants.UNAUTHORISED_ERROR.STATUS,
    		'error' : data && typeof data == 'string' ? `${data}` : "Missing/Invalid Token."  
    	}
        return errResp;
    }
    async forbiddenErrorResponse(msg=null) {
    	let errResp = {
    		'code' : Constants.FORBIDDEN_ERROR.CODE,
    		'status': Constants.FORBIDDEN_ERROR.STATUS,
    		'error' : msg ? msg : "Not Allowed to Make this Request."
    	}
        return errResp;
    }
    async badGatewayErrorResponse() {
    	let errResp = {
    		'code' : Constants.BAD_GATEWAY_ERROR.CODE,
    		'status': Constants.BAD_GATEWAY_ERROR.STATUS,
    		'error' : "Bad Gateway. Please try after sometime."
    	}
        return errResp;
    }
    async serviceUnavailableErrorResponse() {
    	let errResp = {
    		'code' : Constants.SERVICE_UNAVAILABLE_ERROR.CODE,
    		'status': Constants.SERVICE_UNAVAILABLE_ERROR.STATUS,
    		'error' : "Service Not Available. Please try after sometime."
    	}
        return errResp;
    }
    async serverErrorResponse() {
    	let errResp = {
    		'code' : Constants.SERVER_ERROR.CODE,
    		'status': Constants.SERVER_ERROR.STATUS,
    		'error' : "Internal Server Error. Please try after sometime."
    	}
        return errResp;
    }
    async successResponse(data = null, msg = "Success.") {
    	let errResp = {
    		'code' : Constants.OK_SUCCESS.CODE,
    		'status': Constants.OK_SUCCESS.STATUS,
    		'msg' : msg,
    	}
    	if(data && data != {} && data != []){
    		errResp['data'] = data;
    	}
        return errResp;
    }
    async createSuccessResponse(data = null) {
    	let errResp = {
    		'code' : Constants.CREATED_SUCCESS.CODE,
    		'status': Constants.CREATED_SUCCESS.STATUS,
    		'msg' : "Successfully Created.",
    	}
    	if(data){
    		errResp['data'] = data;
    	}
        return errResp;
    }
    async updateSucessResponse(data = null) {
    	let errResp = {
    		'code' : Constants.ACCEPTED_SUCCESS.CODE,
    		'status': Constants.ACCEPTED_SUCCESS.STATUS,
    		'msg' : "Successfully Updated.",
    	}
    	if(data){
    		errResp['data'] = data;
    	}
        return errResp;
    }
    async noContentSucessResponse(data = null) {
    	let errResp = {
    		'code' : Constants.NO_CONTENT_SUCCESS.CODE,
    		'status': Constants.NO_CONTENT_SUCCESS.STATUS,
    		'msg' : "No Data.",
    	}
    	if(data){
    		errResp['data'] = data;
    	}
        return errResp;
    }
}


module.exports = NseResponse;
