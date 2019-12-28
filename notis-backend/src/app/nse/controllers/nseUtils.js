let request = require('request');
let TokenController = require('./nseToken');
let CommonController = require('./nseCommon');
let ResponseController = require('./nseResponse');
let Utils = require('../../../config/Utils.js');
let NseResModel = require('../models/NseResModel');
let NseDataModel = require('../models/NseDataModel');
let NseUsersModel = require('../models/NseUsersModel');
let NseApiLogModel = require('../models/NseApiLogModel');
let moment = require('moment');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;

class NseUtils{
    constructor(){
        this.utils = new Utils();
    }

    getNseData(trade_type){
        let tradeData = C[trade_type];
        return new Promise(async (resolve, reject) => {
            // let tokenController = new TokenController();
            try{
                // let token = await tokenController.getToken();
                console.log("token");
                let nseData = await this.makeRequestForData(tradeData);
                console.log(nseData);
                let nseDataId = await this.setNseDataInDb(nseData.responseData, tradeData);
                await this.insertInApiLog(tradeData, nseData, nseDataId);
                resolve("done");
            } catch(e){
                reject(e);
            }
        });
    }

    makeRequestForData(tradeData){
        return new Promise(async (resolve, reject) => {
            let that = this;
            let body = {
                msgId: await that.getMsgId(),
                url: tradeData.url
            }
            // body = JSON.stringify(body);
            let reqObj = {
                url: `${C.DATA_API_URL}`,
                method: 'GET',
                body: body,
                timeout: 10000,
                json: true
            }
            console.log("${C.NSE_HOST}${url}", body);
            // try{
                request(reqObj, function(err, resp, body){
                    let returnData = {
                        requestData: reqObj,
                        responseData: body
                    }
                    resolve(returnData);
                })
            // } catch(ex){
            //     console.log("ex========>>", ex);
            //     reject(ex);
            // }
            // let body = {
            //     "msgId": that.getMsgId(),
            //     "dataFormat": C.DATA_FORMAT,
            //     "tradesInquiry": "0,ALL,,"
            // }
            
            // let reqObj = {
            //     url: `${C.NSE_HOST}${url}`,
            //     method:'POST',
            //     headers:{
            //         'Authorization':  `Bearer ${token}`,
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         'nonce': that.utils.getNOnce()
            //     },
            //     json: true,
            //     body: body
            // };
        })
    }

    async getMsgId(){
        //TODO make function to get msgId
        //make db to query to get todays date and count nse apis
        let reqCount = await this.getTodaysRequestCount();
        let dateString = (moment().format('YYYY-MM-DD')).split('-').join('')
        return `${C.MEMBER_CODE}${dateString}${reqCount}`
    }

    /**
     * @param url {string}: pass endpoint
     * @param type {string}: pass token for token, pass {{type}} for others
     * @param req {object}: pass post request
     * @returns {integer}: returns id of the inserted data
     */
    setNseDataInDb(nseData, tradeData){
        console.log("inside setNseData", nseData);
        return new Promise(async (resolve, reject) =>{
            let obj = {
                tradeType: tradeData.name,
                dataAvailable: (!this.utils.isEmpty(nseData)) ? (!this.utils.isEmpty(nseData.data)) : false,
                messageCode: (!this.utils.isEmpty(nseData)) ? nseData.messages.code : null,
                status: (!this.utils.isEmpty(nseData)) ? nseData.status: null
            }
            try{
                if(DBConnection){
                    let nseRes = await NseResModel.create(obj);
                    if(!(this.utils.isEmpty(nseData)) &&!(this.utils.isEmpty(nseData.data))){
                        let nseCsvData = [];
                        let nseCsvRaw = nseData.data.actionsInquiry.split('^');
                        for(data of nseCsvRaw){
                            let dataPoints = data.split(',');
                            let dataPointObj = {
                                errCd: dataPoints[0],
                                seqNo: dataPoints[1],
                                actTrdNo: dataPoints[2],
                                actDtTm: new Date(dataPoints[3]),
                                actId: dataPoints[4],
                                tradeType: tradeData.name,
                                nseMainDataId: nseRes.dataValues.id
                            }
                            nseCsvData.push(dataPointObj);
                        }
                        let re = await NseDataModel.bulkCreate(nseCsvData);
                        console.log("*****!!!!!!!!!!*******", re);
                    }
                    console.log("*********", nseRes);
                    resolve(nseRes.dataValues.id)
                } else{
                    reject("error");
                }
            } catch(e){
                reject(e);                
            }
        }) 
    }

    insertInApiLog(tradeData, nseData, id){
        return new Promise(async (resolve, reject) =>{
            try{ 
                let obj = {
                    tradeType: tradeData.name,
                    request: JSON.stringify(nseData.requestData),
                    response: JSON.stringify(nseData.responseData),
                    requestUrl: tradeData.url,
                    nseMainDataId: id
                }
                await NseApiLogModel.create(obj);
                resolve("true");
            } catch(er){
                console.log(er);
                reject(er);
            }
        })
    }


    getTodaysRequestCount(){
        //make db query here
        return new Promise(async (resolve, reject) => { 
            console.log("moment().format('YYYY-MM-DD')+ '%'", moment().format('YYYY-MM-DD')+ '%');
            
            let todaysData = await NseResModel.count({
                where: {
                    createdAt: {
                        [Op.gte]: moment().format('YYYY-MM-DD 00:00:00')
                    },
                },
                    raw: true
                
            })
            console.log(JSON.stringify(todaysData),"*%%%%%%%%%%%%%%%%55");
            let count = 100000000+todaysData;
            
            resolve(count);
        })
    }


    userLogin(reqdata){
        return new Promise(async (resolve, reject) => {
            try{
                if(!reqdata || !reqdata.body){
                    return ResponseController.badRequestErrorResponse(['request body'])
                }
                let commoncheck = CommonController.commonCheck(reqdata, ['user_name', 'password'], 'body');
                if(commoncheck && commoncheck.length){
                    return ResponseController.badRequestErrorResponse(commoncheck)
                }
                let userinfo = await NseUsersModel.findAll({ 
                    where:{
                        user_name: reqdata.body.user_name,
                        password: reqdata.body.password
                    }
                })

                console.log("User Data ----> ", userinfo)
                return resolve(ResponseController.createSuccessResponse(userinfo));
            } 
            catch(err){
                console.log("Error Caught in userLogin() --------> ", err);
                return reject(err)
            }
        })
    }
}

module.exports = NseUtils;

