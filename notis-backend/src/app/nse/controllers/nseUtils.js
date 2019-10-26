let request = require('request');
let TokenController = require('./nseToken');
let Utils = require('../../../config/Utils.js');
let NseResModel = require('../models/NseResModel');
let NseDataModel = require('../models/NseDataModel');
let NseApiLogModel = require('../models/NseApiLogModel');

class NseUtils{
    constructor(){
        this.utils = new Utils();

    }

    getNseData(trade_type){
        // let tradeData = C.TRADE_TYPE.find( o => o.name == trade_type);
        let tradeData = C[trade_type];
        return new Promise(async (resolve, reject) => {
            let tokenController = new TokenController();
            try{
                let token = await tokenController.getToken();
                console.log(token);
                let nseData = await this.makeRequestForData(tradeData.url, token);
                let nseDataId = await this.setNseDataInDb(nseData.responseData, tradeData);
                await this.insertInApiLog(tradeData, nseData, nseDataId);
                resolve("done");
            } catch(e){
                reject(e);
            }
        });
    }

    makeRequestForData(url, token){
        return new Promise(async (resolve, reject) => {
            let that = this;
            let body = {
                "msgId": that.getMsgId(),
                "dataFormat": C.DATA_FORMAT,
                "tradesInquiry": "0,ALL,,"
            }
            body = JSON.stringify(body);
            let reqObj = {
                url: `${C.NSE_HOST}${url}`,
                method:'POST',
                headers:{
                    'Authorization':  `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'nonce': that.utils.getNOnce()
                },
                json: true,
                body: body
            };
            console.log("${C.NSE_HOST}${url}", `${C.NSE_HOST}${url}`, body);
            try{
                request(reqObj, function(err, resp, body){
                    console.log("***********", err, body);
                    let returnData = {
                        requestData: reqObj,
                        responseData: body
                    }
                    resolve(returnData);
                })
            } catch(ex){
                console.log("ex========>>", ex);
                reject(ex);
            }
        })
    }

    getMsgId(){
        //TODO make function to get msgId
        //make db to query to get todays date and count nse apis

        return '1234098392004904';
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
                dataAvailable: (!this.utils.isEmpty(nseData.data)),
                messageCode: nseData.messages.code,
                status: nseData.status
            }
            try{
                if(DBConnection){
                    let nseRes = await NseResModel.create(obj);
                    if(!(this.utils.isEmpty(nseData.data))){
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
    }
}

module.exports = NseUtils;

